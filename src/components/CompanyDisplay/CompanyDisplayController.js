import calendarService from "../../services/calendar/calendar.service";

const periodLookup = {
  dayGridMonth: {
    alias: "Monthly",
    factor: 12,
  },
  timeGridWeek: {
    alias: "Weekly",
    factor: 52,
  },
  timeGridDay: {
    alias: "Daily",
    factor: 365,
  },
};

const generateCardData = (events, companies, period) => {
  const totalPay = calendarService.aggregatePayByAllCompanies(
    events,
    companies
  );

  const companyPayTotals = calendarService.aggregatePayByCompanyId(
    events,
    companies
  );
  let cardData = [];

  // the first datapoint is an aggregate by the period
  cardData.push({
    color: "green",
    //   icon: <Currency size="large" />,
    total: totalPay,
    title: `${periodLookup[period].alias} Earnings`,
    message: `${events.length} sessions`,
  });

  // generate datapoints for every company
  companies.forEach((company) => {
    cardData.push({
      color: company.color,
      total: companyPayTotals[company.company_id],
      title: company.name,
      message: `${calendarService.countOfEventsByCompany(
        events,
        company
      )} sessions`,
    });
  });

  return cardData.filter((data) => data.total > 0);
};

const getTotalSessionsByEvent = (events, event_id) => {};

export default {
  generateCardData: generateCardData,
  getTotalSessionsByEvent: getTotalSessionsByEvent,
};
