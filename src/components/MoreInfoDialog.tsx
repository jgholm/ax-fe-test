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
  Cloud20Filled,
  CloudError20Regular,
  ErrorCircle20Filled,
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
        <DialogBody>
          <DialogTitle>{device.title}</DialogTitle>
          <DialogContent>
            <Card orientation="horizontal" appearance="subtle">
              <CardHeader
                header={
                  <Text weight="semibold">{device.description ?? "..."}</Text>
                }
                description={<Text size={200}>Description</Text>}
              />
            </Card>
            <Card orientation="horizontal" appearance="subtle">
              <CardHeader
                header={<Text weight="semibold">{device.model ?? "..."}</Text>}
                description={<Text size={200}>Product model</Text>}
              />
            </Card>
            <Card orientation="horizontal" appearance="subtle">
              <CardHeader
                header={
                  <Text weight="semibold">{device.version ?? "..."}</Text>
                }
                description={<Text size={200}>Version</Text>}
              />
            </Card>
            <Card orientation="horizontal" appearance="subtle">
              <CardHeader
                header={
                  <Text weight="semibold">{device.version ?? "..."}</Text>
                }
                description={<Text size={200}>Version</Text>}
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
                header={
                  <Text weight="semibold">
                    {device.enabled ? "Enabled" : "Disabled"}
                  </Text>
                }
                description={<Text size={200}>Device status</Text>}
              />
            </Card>
            <Card orientation="horizontal" appearance="subtle">
              <CardPreview>
                {device.connected ? (
                  <Cloud20Filled color={tokens.colorStatusSuccessForeground1} />
                ) : (
                  <CloudError20Regular
                    color={tokens.colorStatusDangerForeground1}
                  />
                )}
              </CardPreview>
              <CardHeader
                header={
                  <Text weight="semibold">
                    {device.connected ? "Connected" : "Disconnected"}
                  </Text>
                }
                description={<Text size={200}>Connection status</Text>}
              />
            </Card>
            <Card orientation="horizontal" appearance="subtle">
              <CardHeader
                header={
                  <Text weight="semibold">{device.timezone ?? "..."}</Text>
                }
                description={<Text size={200}>Timezone</Text>}
              />
            </Card>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" onClick={() => onClose()}>
                Close
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
export default MoreInfoDialog;
