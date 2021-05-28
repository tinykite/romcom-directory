import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const AccordionHeader = styled.header`
  background: black;
  padding: 0.25rem;
  margin: 0;
  color: white;
  margin-top: 1rem;
`;

const AccordionTitle = styled.h3`
  margin-top: 0.5rem;
`;

const AccordionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AccordionListItem = styled.li`
  cursor: pointer;
  padding: 0.25rem;
  margin-top: 0.25rem;
  background: ${(props) => props.selected && "black"};
  color: ${(props) => (props.selected ? "#FFF" : "#000")};
  border-radius: ${(props) => props.selected && "5px"};
  transition: all 0.2s linear;
`;

const updatePreferences = ({
  categoryTitle,
  listItem,
  setFilterPreference,
  filterPreference,
}) => {
  if (filterPreference[categoryTitle] === listItem) {
    setFilterPreference({ ...filterPreference, [categoryTitle]: null });
  } else
    setFilterPreference({ ...filterPreference, [categoryTitle]: listItem });
};

const Accordion = ({ category, filterPreference, setFilterPreference }) => {
  const { title: categoryTitle, data: categoryData } = category;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <section>
        <AccordionHeader onClick={() => setExpanded(!expanded)}>
          <AccordionTitle>
            {categoryTitle} {expanded ? "-" : "+"}
          </AccordionTitle>
        </AccordionHeader>
        <AnimatePresence>
          {expanded && (
            <motion.main
              style={{ overflow: "hidden" }}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AccordionList>
                {categoryData.map((listItem, i) => (
                  <AccordionListItem
                    selected={filterPreference[categoryTitle] === listItem}
                    key={`sortItem_${i}`}
                    onClick={() =>
                      updatePreferences({
                        categoryTitle,
                        listItem,
                        setFilterPreference,
                        filterPreference,
                      })
                    }
                  >
                    {listItem}
                  </AccordionListItem>
                ))}
              </AccordionList>
            </motion.main>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Accordion;
