import {
  DialogTrigger,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
  tokens,
} from "@fluentui/react-components";
import type { Device } from "../types/Types";
import { Checkmark24Filled, ErrorCircle24Filled } from "@fluentui/react-icons";

interface DeviceProps {
  siteTitle: string;
  siteDevices: Device[];
  clickedRow: (deviceId: string) => void;
}

const useDevicesStyles = makeStyles({
  layout: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
});

const Devices = ({ siteTitle, siteDevices, clickedRow }: DeviceProps) => {
  const devicesStyles = useDevicesStyles();

  return (
    <div className={devicesStyles.layout}>
      <Text size={500} weight="semibold">
        Devices in {siteTitle}
      </Text>
      <Table aria-label="Devices">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Device Name</TableHeaderCell>
            <TableHeaderCell>Model</TableHeaderCell>
            <TableHeaderCell>Connected</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {siteDevices.map((device) => (
            <DialogTrigger disableButtonEnhancement key={device.id}>
              <TableRow
                key={device.id}
                onClick={() => clickedRow(device.id.toString())}
              >
                <TableCell>{device.title}</TableCell>
                <TableCell>{device.model}</TableCell>
                <TableCell>
                  {device.connected ? (
                    <Checkmark24Filled
                      color={tokens.colorStatusSuccessForeground1}
                    />
                  ) : (
                    <ErrorCircle24Filled
                      color={tokens.colorStatusDangerForeground1}
                    />
                  )}
                </TableCell>
              </TableRow>
            </DialogTrigger>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Devices;
