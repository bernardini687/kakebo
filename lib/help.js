module.exports = {
  mainHelp: `
    [ main help ]

      * read *
        $ kakebo <interval>
          --day,   -d :: today's entries
          --week,  -w :: this week's
          --month, -m :: this month's
          --year,  -y :: current year's

        $ kakebo --day 2
          :: pass a number <n> to read entries of <n> <interval> ago

      * budget *
        $ kakebo budget
          :: get a monthly budget overview
  `,
  readHelp: `
    [ read help ]

      $ kakebo <interval>
        --day,   -d :: today's entries
        --week,  -w :: this week's
        --month, -m :: this month's
        --year,  -y :: current year's

      pass a number <n> to read entries of <n> <interval> ago

      $ kakebo --day 2
  `,
  budgetHelp: `
    [ budget help ]

      $ kakebo budget
        :: get a monthly budget overview
  `
}
