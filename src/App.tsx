import { Link, makeStyles, Text, tokens } from "@fluentui/react-components";
import Sites from "./components/Sites";
import { useCallback, useEffect, useState } from "react";
import Devices from "./components/Devices";
import axios from "axios";
import type { Site, Device } from "./types/Types";
import MoreInfoDialog from "./components/MoreInfoDialog";
import Login from "./components/Login";

const useLayoutStyles = makeStyles({
  pageLayout: {
    display: "flex",
    flexDirection: "column",
    padding: tokens.spacingHorizontalXXXL,
    alignSelf: "start",
  },
  contentLayout: {
    marginTop: tokens.spacingVerticalL,
    display: "flex",
    flexDirection: "row",
  },
});

const sitesEndpoint = "http://localhost:3000/sites";
const devicesEndpoint = "http://localhost:3000/devices";

function App() {
  const [selectedSiteId, setSelectedSiteId] = useState<string>("");
  const [selectedSiteTitle, setSelectedSiteTitle] = useState("");
  const [currentDevice, setCurrentDevice] = useState<Device>({} as Device);
  const layoutStyles = useLayoutStyles();
  const [sitesData, setSitesData] = useState<Site[]>([]);
  const [devicesData, setDevicesData] = useState<Device[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const clickedRow = (id: string) => {
    const device = devicesData.find(
      (device: Device) => device.id.toString() === id
    );
    setCurrentDevice(device ? device : ({} as Device));
  };

  const closeDialog = () => {
    setCurrentDevice({} as Device);
  };

  const authAs = (username: string) => {
    setLoggedIn(true);
    setUsername(username);
    setSelectedSiteId("");
    fetchSites();
  };

  const logOut = () => {
    setLoggedIn(false);
    setUsername("");
    setSelectedSiteId("");
  };

  const fetchSites = useCallback(async () => {
    if (!loggedIn) return;
    if (loggedIn) {
      const sites = await axios.get(sitesEndpoint);
      const allowedSites = sites.data.filter((site: Site) =>
        site.owner.includes(username)
      );
      setSitesData(allowedSites);
    }
  }, [username, loggedIn]);

  const fetchDevices = useCallback(async () => {
    const devices = await axios.get(devicesEndpoint);
    setDevicesData(
      devices.data.filter(
        (device: Device) => device.site_id.toString() === selectedSiteId
      )
    );
    setSelectedSiteTitle(
      sitesData.find((site: Site) => site.id.toString() === selectedSiteId)
        ?.title || ""
    );
  }, [selectedSiteId, sitesData]);

  useEffect(() => {
    setSelectedSiteId(sitesData[0]?.id.toString());
  }, [sitesData]);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  useEffect(() => {
    fetchDevices();
  }, [sitesData, fetchDevices]);

  return (
    <>
      {loggedIn ? (
        <div className={layoutStyles.pageLayout}>
          <Text
            size={200}
            weight="bold"
            as="h1"
            style={{ marginBottom: tokens.spacingVerticalL }}
          >
            Welcome {username} <Link onClick={() => logOut()}>LOG OUT</Link>
          </Text>

          <Text size={700} weight="bold">
            Sites 'n devices
          </Text>
          <div className={layoutStyles.contentLayout}>
            <Sites
              selectedSiteId={selectedSiteId}
              onSiteSelect={(id) => setSelectedSiteId(id)}
              sites={sitesData}
            />
            <Devices
              siteTitle={selectedSiteTitle}
              siteDevices={devicesData}
              clickedRow={(id) => clickedRow(id)}
            />
          </div>
          <MoreInfoDialog
            device={currentDevice}
            open={!!currentDevice.title}
            onClose={() => closeDialog()}
          />
        </div>
      ) : (
        <Login authAs={(username) => authAs(username)} />
      )}
    </>
  );
}

export default App;
