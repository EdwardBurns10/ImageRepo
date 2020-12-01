import React, { useState, useEffect } from "react";

import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiFlexGrid,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiTitle,
  EuiIcon,
  EuiHeaderSectionItemButton,
  EuiSpacer,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiEmptyPrompt,
  EuiButton
} from "@elastic/eui";

import { observers, queries, auth } from "../api";
import { ImCard } from "../components/ImageCard";
import { ImForm } from "../components/ImageForm";

export const Home = () => {
  const [values, setValues] = useState(null);
  const [IForm, setIForm] = useState(null);

  const refreshC = () => queries.getI().then(setValues);

  useEffect(() => {
    refreshC();

    const observer = observers.onIChange(refreshC);

    return () => {
      observer.cancel();
    };
  }, []);

  return (
    <React.Fragment>
      <EuiHeader>
        <EuiHeaderSection grow>
          <EuiHeaderSectionItem border="none">
            <EuiHeaderLogo iconType="discoverApp">
              Proof of Concept
            </EuiHeaderLogo>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side="right">
          <EuiHeaderLinks>
            <EuiHeaderLink onClick={auth.logout}>LOGOUT</EuiHeaderLink>
          </EuiHeaderLinks>
          <EuiHeaderSectionItem border="none">
            <EuiHeaderSectionItemButton onClick={() => setIForm({})}>
              <EuiIcon type="plusInCircleFilled" />
            </EuiHeaderSectionItemButton>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
      {IForm && (
        <EuiFlyout onClose={() => setIForm(null)} size="s" ownFocus>
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2>Add Image</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <ImForm
              content={IForm}
              onSubmit={content => {
                return queries.saveI(content).then(() => setIForm(null));
              }}
            />
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
      <EuiSpacer />
      {Array.isArray(values) &&
        (values.length > 0 ? (
          <EuiFlexGrid columns={4}>
            {values.map(content => (
              <EuiFlexItem key={content._id}>
                <ImCard
                  content={content}
                  onRemove={() => queries.removeI(content)}
                  onEdit={() => setIForm(content)}
                />
              </EuiFlexItem>
            ))}
          </EuiFlexGrid>
        ) : (
          <EuiEmptyPrompt
            iconType="starPlusEmpty"
            title={<h2>You have no Images</h2>}
            body={
              <React.Fragment>
                <p>
                  Sadly, You don't have any images in this report :(
                  <br />
                  It's maybe the time to add one?
                </p>
              </React.Fragment>
            }
            actions={
              <EuiButton fill onClick={() => setIForm({})}>
                Add New Image
              </EuiButton>
            }
          />
        ))}
    </React.Fragment>
  );
};
