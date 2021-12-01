import { dataToItem, deltaToExpression, itemToData } from 'dynamo-converters';

tempJson = {
    "title": "generic title",
    "location": "generic location",
    "notes": "generic notes",
    "dates": "2022-01-01",
    "start": "08:00 am",
    "end": "09:00 am",
    "zone": "CST",
    "slotsTime": "",
    "slotsBlock": "5",
    "intervals": [
        "2022-01-01 08:00 AM",
        "2022-01-01 08:12 AM",
        "2022-01-01 08:24 AM",
        "2022-01-01 08:36 AM",
        "2022-01-01 08:48 AM",
        "2022-01-01 09:00 AM"
    ],
    "votesPerSlot": "",
    "voterPerVoter": "",
    "invites": "yes",
    "reminder": "yes",
    "deadline": "",
    "titleError": "",
    "datesError": "",
    "datesFormatError": "",
    "startError": "",
    "endError": "",
    "startEndError": "",
    "zoneError": "",
    "slotsError": "",
    "slotsBlockError": "",
    "slotsTimeError": "",
    "invitesError": "",
    "reminderError": "",
    "votesPerSlotError": "",
    "votesPerSlotError2": "",
    "voterPerVoterError": "",
    "voterPerVoterError2": "",
    "deadlineError": "",
    "deadlineFormatError": ""
}



console.log(dataToItem(tempJson))


toReturn = {
    "TableName": "SeniorDesignLab3DB",
    "Item": {
      "UniqueTitle": {
        "S": "AnotherUniqueTitle"
      },
      "location": {
        "S": "Upstairs Lab"
      },
      "notes": {
        "S": "Here are some notes. Read them carefully"
      },
      "dates": {
        "S": "03-12-2021"
      },
      "start": {
        "S": "08:00"
      },
      "end": {
        "S": "15:00"
      },
      "zone": {
        "S": "CST"
      },
      "slots": {
        "N": "5"
      },
      "votesPerSlot": {
        "N": "0"
      },
      "votesPerVoter": {
        "N": "1"
      },
      "invites": {
        "S": "yes"
      },
      "reminder": {
        "S": "no"
      }
    }
  }