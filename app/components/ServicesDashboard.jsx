/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useContext } from 'react';
import ServiceOverview from './ServiceOverview.jsx';
import DashboardContext from '../context/DashboardContext';
import SetupContext from '../context/SetupContext';
import AddService from './AddService.jsx';
import DeleteService from './DeleteService.jsx';

const ServicesDashboard = (props) => {
  // Used to toggle setup required if user wants to add a new database.
  const setup = useContext(SetupContext);

  // List of the databases saved by users to track microservices.
  const serviceList = useContext(DashboardContext);

  // Used to hold the buttons created for each database found in context.
  const [serviceSelected, setSelection] = useState();

  // Creates button for each database in dashboard context.
  const renderServiceList = (context) => {
    const buttonStore = [];
    for (let i = 0; i < context.length; i += 1) {
      buttonStore.push(
        <button
          className="microserviceBtn"
          type="button"
          key={`${i}${context[i]}`}
          onClick={() => {
            setSelection(<ServiceOverview index={i} />);
          }}
        >
          {context[i]}
        </button>,
      );
    }
    return buttonStore;
  };

  const tooltipWriteup = 'Please provide a different database to monitor additional microservice applications.';

  return (
    <div className="servicesDashboardContainer">
      <div className="left">
        <div className="leftTopContainer">
          <img alt="Chronos Logo" src="app/assets/icon2Cropped.png" id="serviceDashLogo" />
          <div className="left-top">
            <h2 className="dashboardHeader">
              Your Databases
              <sup className="tooltip">
                &#9432;
                <div className="tooltiptext">{tooltipWriteup}</div>
              </sup>
            </h2>
            {renderServiceList(serviceList)}
          </div>
          <div className="left-bottom">
            <button
              className="overviewSubmitBtn"
              type="submit"
              key="BackToStart"
              onClick={() => {
                setup.setupRequired = setup.toggleSetup(false);
                setSelection(<AddService />);
              }}
            >
            Add Database
            </button>
            <button
              className="overviewSubmitBtn"
              type="submit"
              key="goToDeletePage"
              onClick={() => {
                setSelection(<DeleteService />);
              }}
            >
            Delete Database
            </button>
          </div>
          <div className="left-bottom">
            <button
              className="overviewSubmitBtn"
              type="submit"
              onClick={() => {
                location.reload();
              }}
            >
              Refresh overview
            </button>
          </div>

        </div>
      </div>
      <div className="databsaseList">
        {serviceSelected}
      </div>
    </div>
  );
};

export default ServicesDashboard;
