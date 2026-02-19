export interface TableSchema {
  headers: string[];
  shiftStartTimes: string[];
  target?: number;
}

export const tableSchemas: Record<string, TableSchema> = {
  // ================= CITY TYRE =================
  "CITY TYRE_Production": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time", "Target", "Produced Batch No.",
      "Manufacturing Date", "Completed Target"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "CITY TYRE_Quality Controller": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Produced Batch No.", "Pending Batch No From Maintenance",
      "Accepted Batch No From Maintenance", "Remark",
      "Sold Batch No"

    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "CITY TYRE_Sales": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time", "Produced Batch No.",
      "Target", "Bill No", "Tyre Model"
    ],
    shiftStartTimes: ["08:00", "14:00"],
    target: 50
  },

  "CITY TYRE_Maintenance": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Produced Batch No.", "Remark"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  // ================= MILLER =================
  "MILLER_Production": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time", "Target",
      "Produced Batch No.", "Manufacturing Date", "Expiry Date", "Completed Target"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "MILLER_Sales": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time", "Produced Batch No.",
      "Target", "Bill No", "Tyre Model"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "MILLER_Maintenance": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Produced Batch No.", "Remark"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "MILLER_Supervisor": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Produced Batch No.", "pending Batch No From Maintenance", "Accepted Batch No From Maintenance", "Remark",
      "Sold Sales No From Sales",

    ],
    shiftStartTimes: ["08:00", "14:00"]
  },



  // ================= CAFE =================
  "CAFE_Inventory": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Opening Stock", "Closing Stock", "Dispatche to Service Dept", "Dispatche to Kitchen Dept", "Excess Stock from Service", "Excess Stock from Kitchen"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "CAFE_Kitchen": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Received From Inventory", "Excess Stock", "Rate", "Bill No"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "CAFE_Service": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Received From Inventory", "Excess Stock", "Rate", "Bill No"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "CAFE_Cleaning": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Received From Inventory", "Excess Stock", "Rate", "Bill No"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "CAFE_Quality Controller": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Opening Stock from inventory", "dispatched Stock from inventory", "Closing Stock from inventory", "Sold from kitchen & service", "Bill No of kitchen and & service", "Receive cash for sale", "Excess stock from service", "excess stock from kitchen"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  }
};
