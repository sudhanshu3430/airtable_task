require('dotenv').config()

const BASE_ID = process.env.BASE_ID;
const TABLE_ID = process.env.TABLE_ID;

var Airtable = require("airtable");
var base = new Airtable({
  apiKey: process.env.API_KEY,
}).base(BASE_ID);


//readRecords will fetch all records from the table
function readRecords() {
    base(TABLE_ID)
  .select({
    view: "Grid view",
  })
  .eachPage(
    function page(records, fetchNextPage) {
      records.forEach(function (record) {
        console.log( record.get("First Name"), record.get("Last Name"), record.get("Status"), record.getId());
      });

      // Fetch the next page of records, if there are any
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err); //logging error if there's any error during execution
        return;
      }
      console.log("All records have been retrieved.");
    }
  );
}

// updateRecords for updating records of the table

function updateRecords() {
    // update receives array of objects. Id will be for the record id and fields for updating the desired field.
    base(TABLE_ID).update([
        {
          "id": "recnFFu6N5UzDcmMP",
          "fields": {
            "First Name": "update John ",
            "Last Name": "Cena",
            "Status": "Todo"
          }
        },
        
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          console.log(record.get('First Name')); //logging first name
        });
      });
}

// deleteRecord for deleting desired records destroy method receives array of records to delete multiple records
function deleteRecord() {
    base(TABLE_ID).destroy(['recnFFu6N5UzDcmMP'], function(err, deletedRecords) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted', deletedRecords.length, 'records'); //printing no. of records that got deleted
      });
      
}

// createRecord for inserting new records in the table create method also receives array of objects. Which can be used to add multiple records
function createRecord() {
    base(TABLE_ID).create([
        {
          "fields": {
            "First Name": "New name",
            "Last Name": "New",
            "Status": "Todo"
          }
        },
       
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId()); //logging the record id that gets inserted
        });
      });
}

// Calling function according to desired operation 
readRecords();
// updateRecords();
// deleteRecord();
// createRecord();