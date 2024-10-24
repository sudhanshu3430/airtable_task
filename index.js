var Airtable = require("airtable");
var base = new Airtable({
  apiKey: "patRthG3dUDhPuFLG.cd142b6e471c382aa5bac355e9325674d1ca38b79a67e2d41bb03f232694310c",
}).base("appx5Jofub2qik7xT");


//readRecords will fetch all records from the table
function readRecords() {
    base("tbloKkGqvqH1A33EU")
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
    base('tbloKkGqvqH1A33EU').update([
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
    base('tbloKkGqvqH1A33EU').destroy(['recnFFu6N5UzDcmMP'], function(err, deletedRecords) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted', deletedRecords.length, 'records'); //printing no. of records that got deleted
      });
      
}

// createRecord for inserting new records in the table create method also receives array of objects. Which can be used to add multiple records
function createRecord() {
    base('Table 1').create([
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