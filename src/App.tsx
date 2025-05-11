import { makeStyles, Text, tokens } from "@fluentui/react-components";
import Sites from "./components/Sites";
import { useCallback, useEffect, useState } from "react";
import Devices from "./components/Devices";
import axios from "axios";
import type { Site, Device } from "./types/Types";
import MoreInfoDialog from "./components/MoreInfoDialog";

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
  const [selectedSiteId, setSelectedSiteId] = useState<string>("1");
  const [selectedSiteTitle, setSelectedSiteTitle] = useState("");
  const [currentDevice, setCurrentDevice] = useState<Device>({} as Device);
  const layoutStyles = useLayoutStyles();
  const [sitesData, setSitesData] = useState<Site[]>([]);
  const [devicesData, setDevicesData] = useState<Device[]>([]);

  const clickedRow = (id: string) => {
    const device = devicesData.find(
      (device: Device) => device.id.toString() === id
    );
    setCurrentDevice(device ? device : ({} as Device));
  };

  const closeDialog = () => {
    setCurrentDevice({} as Device);
  };

  // improvments: Move API stuff to hooks
  const fetchData = useCallback(async () => {
    const sites = await axios.get(sitesEndpoint);
    setSitesData(sites.data);
    setSelectedSiteTitle(
      sites.data.find((site: Site) => site.id.toString() === selectedSiteId)
        .title
    );
    const devices = await axios.get(devicesEndpoint);
    setDevicesData(
      devices.data.filter(
        (device: Device) => device.site_id.toString() === selectedSiteId
      )
    );
  }, [selectedSiteId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={layoutStyles.pageLayout}>
      <Text size={700} weight="bold">
        Sites 'n devices
      </Text>
      <div className={layoutStyles.contentLayout}>
        <Sites
          selectetedSiteId={selectedSiteId}
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
  );
}

export default App;
