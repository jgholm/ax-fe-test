import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  DialogTrigger,
  Card,
  CardHeader,
  Text,
  CardPreview,
  tokens,
} from "@fluentui/react-components";
import type { Device } from "../types/Types";
import {
  Checkmark20Filled,
  ErrorCircle20Filled,
  HardDrive24Filled,
} from "@fluentui/react-icons";

interface MoreInfoDialogProps {
  device: Device;
  open: boolean;
  onClose: () => void;
}

const MoreInfoDialog = ({ device, open, onClose }: MoreInfoDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogSurface>
        {device.title && (
          <DialogBody>
            <DialogTitle>{device.title}</DialogTitle>
            <DialogContent>
              <Card orientation="horizontal" appearance="subtle">
                <CardHeader
                  header={<Text weight="semibold">Description</Text>}
                  description={<Text size={200}>{device.description}</Text>}
                />
              </Card>
              <Card orientation="horizontal" appearance="subtle">
                <CardHeader
                  header={<Text weight="semibold">Product model</Text>}
                  description={<Text size={200}>{device.model}</Text>}
                />
              </Card>
              <Card orientation="horizontal" appearance="subtle">
                <CardHeader
                  header={<Text weight="semibold">Version</Text>}
                  description={<Text size={200}>{device.version}</Text>}
                />
              </Card>
              <Card orientation="horizontal" appearance="subtle">
                <CardPreview>
                  {device.connected ? (
                    <Checkmark20Filled
                      color={tokens.colorStatusSuccessForeground1}
                    />
                  ) : (
                    <ErrorCircle20Filled
                      color={tokens.colorStatusDangerForeground1}
                    />
                  )}
                </CardPreview>
                <CardHeader
                  header={<Text weight="semibold">Device status</Text>}
                  description={
                    <Text size={200}>
                      {device.enabled ? "Enabled" : "Disabled"}
                    </Text>
                  }
                />
              </Card>
              <Card orientation="horizontal" appearance="subtle">
                <CardPreview>
                  {device.connected ? (
                    <Checkmark20Filled
                      color={tokens.colorStatusSuccessForeground1}
                    />
                  ) : (
                    <ErrorCircle20Filled
                      color={tokens.colorStatusDangerForeground1}
                    />
                  )}
                </CardPreview>
                <CardHeader
                  header={<Text weight="semibold">Connection status</Text>}
                  description={
                    <Text size={200}>
                      {device.connected ? "Connected" : "Disconnected"}
                    </Text>
                  }
                />
              </Card>
              <Card orientation="horizontal" appearance="subtle">
                <CardHeader
                  header={<Text weight="semibold">Timezone</Text>}
                  description={<Text size={200}>{device.timezone}</Text>}
                />
              </Card>
              {device.storages.length > 0 && (
                <Card appearance="outline">
                  <CardHeader
                    header={<Text weight="semibold">Storages</Text>}
                  />
                  {device.storages.map((storage, key) => (
                    <Card
                      orientation="horizontal"
                      appearance="subtle"
                      key={key}
                    >
                      <CardPreview>
                        <HardDrive24Filled
                          color={
                            storage.state === "ok"
                              ? tokens.colorStatusSuccessForeground1
                              : tokens.colorNeutralBackground1Hover
                          }
                        />
                      </CardPreview>
                      <CardHeader
                        header={
                          <Text weight="semibold">
                            {storage.id === "SDCard"
                              ? "SD Card"
                              : "Network storage"}
                          </Text>
                        }
                        description={
                          <Text size={200}>Status: {storage.state}</Text>
                        }
                      />
                    </Card>
                  ))}
                </Card>
              )}
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary" onClick={() => onClose()}>
                  Close
                </Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        )}
      </DialogSurface>
    </Dialog>
  );
};
export default MoreInfoDialog;
