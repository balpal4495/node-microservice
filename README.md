# node-microservice New Beginnings

Run
======

### Node version V14

to start server run 
```
npm start
```
or 

```
node server.js
```


check test coverage with

```
npm test:report
```


type userObject
======

```
{
  _id?: string;
  firstName: string;
  lastName: string;
  dob: string;
  address: {
    doorNumber: number;
    line1: string;
    line2?: string;
    town: string;
    county: string;
    postCode: string;
  },
  contact: {
    country: string;
    areaCode: string;
    number: string;
  }
}
```


Service endpoints
======
![users service diagram](users-service.png 'users service diagram =')

Trade offs
======

I chose to make the address be its own object because there are multiple variations for an address

I could have created it to be just a single string object, but this can allow more mistakes to happen during user input.


similar issue for contact, I decided that an object which contains the properties for areaCode, number, and country would work best overall.

areacode generally does work fine for countries, but ISO-3166-1 generally is the standard to follow for cases such as this.

I decided to simplify the as a string which could be parsed as a date, but a JS date value may work better.

in terms of validation i chose to focus more on the mobile number as that should truly be unique whilst the address may not necessarily be unique as multiple people from the same household could be part of the trials



Implementation thoughts
======

This is a very simplistic microservice, it has no connection to the database, and i also needed to make use of the `nanoid` package for uuid generation (for testing and debug purposes)

There is alot of room for improvement, but it would require some knowledge of the existing ecosystem.

This service at the moment feels very synchrounous, and actually would have a dependency on the supposed unique ref generation service, which doesn't feel that great, since it without that service in place this is not a reliable microservice.

There is an option of adding an extra endpoint to retrieve all of the users stored in the db, but i feel that would not be a good implementation.

A better implementation would be if this was an event based / async microservice, which would be able to

1. communicate with an event bus
2. handle events sent to from an event bus
3. have the abilility to sync events if a service went down and come back up later

Being able to send events to an event bus when a user has been added / deleted / updated would be better because it opens up the oppurtunity to have a seperate service that could be dedicated to just querying users with its own set of authentication rules.

the downsides would be data duplication and added complexity, but with the upsides of less dependencies across services and the potential for faster performance.
