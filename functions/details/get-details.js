const { CloudantV1 } = require("@ibm-cloud/cloudant");
const { IamAuthenticator } = require("ibm-cloud-sdk-core");

/**
 *
 * main() will be run when you invoke this action
 *
 * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
 *
 * @return The output of this action, which must be a JSON object.
 *
 */
function main(params) {
  return new Promise((resolve, reject) => {
    if (params && params.type === "reviews") {
      getReviews(params).then((reviews) => {
        resolve({
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: { reviews: reviews.docs },
        });
      });
    } else if (params && params.type === "timeslots") {
      if (params.date) {
        resolve({
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: getTimeSlots(params.date),
        });
      } else {
        resolve({
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: getTimeSlots(new Date()),
        });
      }
    }
  });
}

async function getReviews(params) {
  console.log(params.CLOUDANT_URL);
  console.log(params.CLOUDANT_APIKEY);
  let reviews = [];
  const authenticator = new IamAuthenticator({
    apikey: params.CLOUDANT_APIKEY,
  });
  const cloudant = CloudantV1.newInstance({
    authenticator: authenticator,
  });

  cloudant.setServiceUrl(params.CLOUDANT_URL);

  const DATABASE = "reviews";

  return await cloudant.postFind({
    db: DATABASE,

    selector: {
      dealership: {
        $eq: 13,
      },
    },
  });
}

function getTimeSlots(date) {
  // ideally the code would look this up in the database, but due to limited time, this function returns some hardcoded values at this time
  const d = new Date(date);

  let result = {
    arr: [
      {
        title: `Available time slots for ${date}`,
        options: [],
        description: "",
        response_type: "option",
      },
    ],
  };

  switch (d.getDay()) {
    case 0:
      // Sunday
      // result.day = "Sunday";
      getSlots(result);
      break;
    case 1:
      // Monday
      getSlots(result);
      break;
    case 2:
      // Tue
      getSlots(result);
      break;
    case 3:
      // Wed
      getSlots(result);
      break;
    case 4:
      // Thu
      getSlots(result);
      break;
    case 5:
      // Fri
      getSlots(result);
      break;
    case 6:
      // Sat
      getSlots(result);
      break;
    default:
      result = {
        error: "Something went wrong!",
      };
      break;
  }
  return result;
}

function getWeekend(result) {
  //Implement it if you want to challenge yourself.
}

function getSlots(result) {
  result.arr[0].options.push({
    label: "8:00am - 9:00am",
    value: {
      input: {
        text: "8:00am - 9:00am",
      },
    },
  });

  result.arr[0].options.push({
    label: "11:00am - 1:00pm",
    value: {
      input: {
        text: "11:00am - 1:00pm",
      },
    },
  });

  return result;
}

exports.main = main;
