import {
  makeStyles,
  Tab,
  TabList,
  Text,
  tokens,
} from "@fluentui/react-components";
import { Folder16Filled, FolderOpen16Filled } from "@fluentui/react-icons";
import type { Site } from "../types/Types";

interface SitesProps {
  sites: Site[];
  onSiteSelect: (siteId: string) => void;
  selectedSiteId: string;
}

const useSitesStyles = makeStyles({
  layout: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: "200px",
  },
});

const Sites = ({ sites, onSiteSelect, selectedSiteId }: SitesProps) => {
  const sitesStyles = useSitesStyles();

  return (
    <div className={sitesStyles.layout}>
      <Text size={500} weight="semibold">
        Sites
      </Text>
      <TabList
        vertical
        selectedValue={selectedSiteId}
        onTabSelect={(_, tab) => onSiteSelect(tab.value as string)}
      >
        {sites.map((site) => (
          <Tab
            key={site.id}
            icon={
              selectedSiteId === site.id.toString() ? (
                <FolderOpen16Filled />
              ) : (
                <Folder16Filled />
              )
            }
            value={site.id.toString()}
          >
            {site.title}
          </Tab>
        ))}
      </TabList>
    </div>
  );
};
export default Sites;
