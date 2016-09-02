const util = require('util');

module.exports = {
  fields: {
    userID: { type: 'int' },
    uniId: { type: 'uuid', default: { $db_function: 'uuid()' } },
    timeId: { type: 'timeuuid' },
    Name: { type: 'varchar', default: 'no name provided' },
    surname: { type: 'varchar', default: 'no surname provided' },
    completeName: {
      type: 'varchar',
      default: function f() {
        let returnValue = this.Name;
        if (this.surname) returnValue = util.format(' %s', this.surname);
        return returnValue;
      },
    },
    age: {
      type: 'int',
      rule: {
        validator: (value) => (value > 0),
      },
    },
    ageString: {
      type: 'text',
      virtual: {
        get() {
          return this.age.toString();
        },
        set(value) {
          this.age = parseInt(value, 10);
        },
      },
    },
    timeMap: {
      type: 'map',
      typeDef: '<text, timestamp>',
    },
    revtimeMap: {
      type: 'map',
      typeDef: '<timestamp, text>',
    },
    intMap: {
      type: 'map',
      typeDef: '<text, int>',
    },
    intMapDefault: {
      type: 'map',
      typeDef: '<text, int>',
      default: {
        one: 1,
        two: 2,
      },
    },
    stringMap: {
      type: 'map',
      typeDef: '<text, text>',
    },
    timeList: {
      type: 'list',
      typeDef: '<timestamp>',
    },
    intList: {
      type: 'list',
      typeDef: '<int>',
    },
    stringList: {
      type: 'list',
      typeDef: '<text>',
    },
    stringListDefault: {
      type: 'list',
      typeDef: '<text>',
      default: ['one', 'two'],
    },
    timeSet: {
      type: 'set',
      typeDef: '<timestamp>',
    },
    intSet: {
      type: 'set',
      typeDef: '<int>',
    },
    intSetDefault: {
      type: 'set',
      typeDef: '<int>',
      default: [1, 2],
    },
    stringSet: {
      type: 'set',
      typeDef: '<text>',
    },
    info: { type: 'map', typeDef: '<varchar,varchar>' },
    phones: { type: 'list', typeDef: '<varchar>' },
    emails: { type: 'set', typeDef: '<varchar>' },
    address: {
      type: 'frozen',
      typeDef: '<"Address">',
    },
    frozenMap: {
      type: 'frozen',
      typeDef: '<map <text, frozen<"Address">>>',
    },
    points: {
      type: 'double',
      rule: {
        validator: (value) => (value > 0),
        required: true,
      },
    },
    active: 'boolean',
    createdAt: { type: 'timestamp', default: { $db_function: 'toTimestamp(now())' } },
  },
  key: [['userID'], 'age'],
  indexes: ['Name', 'phones', 'emails', 'keys(info)', 'entries(info)', 'values(info)', 'full(frozenMap)'],
  materialized_views: {
    mat_view_composite: {
      select: ['*'],
      key: [['userID', 'age'], 'active'],
    },
  },
};
