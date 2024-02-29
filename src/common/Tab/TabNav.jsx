import { Link } from "gatsby";

import { Container } from "@/common/Container/Container";
import { Tab } from "@/common/Tab/Tab";

export const TabNav = ({ activeTab, headers }) => {
  return (
    <div className="border-b border-b-B0C4DB" data-testid="tab-nav-container">
      <Container className="flex">
        {headers.map((header) => {
          return (
            <Tab key={header.name} active={activeTab === header.name}>
              <Link
                to={header.href}
                className="inline-block px-2 py-2 xs:px-5 sm:px-6"
              >
                {header.displayAs}
              </Link>
            </Tab>
          );
        })}
      </Container>
    </div>
  );
};
