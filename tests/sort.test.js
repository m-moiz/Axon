const sortByKey = require("../client/src/utils/sort");

it("should sort by key", () => {
  const array = [
    { priorityType: "High" },
    { priorityType: "Low" },
    { priorityType: "Medium" },
    { priorityType: "Lowest" },
    { priorityType: "" },
  ];
  const sortedArray = sortByKey(array, "Highest Priority");
  expect(sortedArray).toEqual([
    { priorityType: "High" },
    { priorityType: "Medium" },
    { priorityType: "Low" },
    { priorityType: "Lowest" },
    { priorityType: "" },
  ]);
});

it("should sort an issues array", () => {
  const array = [
    {
      assignee: "5f055e59290b9042c8392246",
      createdBy: "user5",
      creationDate: "2022-12-25T23:06:09.704Z",
      creator: "5f055e59290b9042c8392246",
      description:
        '{"blocks":[{"key":"9oc4g","text":"Laptop is not turning on","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1rhqu","text":"Troubleshooting:-","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1ir5p","text":"User has tried power cycling the laptop.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"73r9r","text":"User tried reseating cables ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      dueDate: "2022-12-26T02:30:08.080Z",
      environment: "Windows",
      issueType: "Task",
      numOfComments: 0,
      priorityType: "Medium",
      reporter: "5f055e59290b9042c8392246",
      status: "Open",
      summary: "Laptop is not turning on",
      users: [],
      version: "10",
      __v: 0,
      _id: "63a9077b49d3e84518834632",
    },
    {
      assignee: "5f055e59290b9042c8392246",
      createdBy: "user5",
      creationDate: "2022-12-25T23:06:09.704Z",
      creator: "5f055e59290b9042c8392246",
      description:
        '{"blocks":[{"key":"emn5q","text":"Receipt printer is printing faded receipts","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      dueDate: "2022-12-27T02:28:58.000Z",
      environment: "Edge",
      issueType: "Epic",
      numOfComments: 0,
      priorityType: "High",
      reporter: "5f055e59290b9042c8392246",
      status: "Open",
      summary: "Receipt printer is printing faded receipts",
      users: [],
      version: "1",
      __v: 0,
      _id: "63a9071f49d3e84518834629",
    },
  ];
  const sortedArray = sortByKey(array, "Highest Priority");
  expect(sortedArray).toEqual([
    {
        assignee: "5f055e59290b9042c8392246",
        createdBy: "user5",
        creationDate: "2022-12-25T23:06:09.704Z",
        creator: "5f055e59290b9042c8392246",
        description:
          '{"blocks":[{"key":"emn5q","text":"Receipt printer is printing faded receipts","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        dueDate: "2022-12-27T02:28:58.000Z",
        environment: "Edge",
        issueType: "Epic",
        numOfComments: 0,
        priorityType: "High",
        reporter: "5f055e59290b9042c8392246",
        status: "Open",
        summary: "Receipt printer is printing faded receipts",
        users: [],
        version: "1",
        __v: 0,
        _id: "63a9071f49d3e84518834629",
      }, 
      {
        assignee: "5f055e59290b9042c8392246",
        createdBy: "user5",
        creationDate: "2022-12-25T23:06:09.704Z",
        creator: "5f055e59290b9042c8392246",
        description:
          '{"blocks":[{"key":"9oc4g","text":"Laptop is not turning on","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1rhqu","text":"Troubleshooting:-","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1ir5p","text":"User has tried power cycling the laptop.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"73r9r","text":"User tried reseating cables ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        dueDate: "2022-12-26T02:30:08.080Z",
        environment: "Windows",
        issueType: "Task",
        numOfComments: 0,
        priorityType: "Medium",
        reporter: "5f055e59290b9042c8392246",
        status: "Open",
        summary: "Laptop is not turning on",
        users: [],
        version: "10",
        __v: 0,
        _id: "63a9077b49d3e84518834632",
      }
  ]);
});
