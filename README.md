# The IMF and Global Dispossession

An in-progress senior project by Nathan Kim, exploring the racial
logic embedded in the International Monetary Fund's Structural
Adjustment Programs (SAPs) through textual and digital means.

Contact me at nathan.kim@yale.edu for any questions.

### Project overview

Since its founding in 1944, the International Monetary Funds has
amassed a total of 705 billion Special Drawing Rights (SDRs) in
spending capacity, or about \$1 trillion. As opposed to the World
Bank's extensive general lending system, IMF loans have played a
pivotal role specifically during times of crisis. The relatively small
organization (of only \~2,300 staff members) with no subsidiary
organizations is able to move the global economy through these loans,
millions of people at a time, and its focus on low-to-middle-income
countries during crises means that the most vulnerable of the global
population are affected by its work.

The IMF's loans are not without caveats. Under the stated purpose of
ensuring loan repayment and financial stability, or "conditionality,"
the IMF requires that loan-receiving countries also implement a set of
macroeconomic policy reforms known as Structural Adjustment Programs
(SAPs). These include "purely" economic measures like currency
devaluation, austerity measures, and restructuring or refinancing
foreign debts, but also include liberalization of markets broadly,
privatization of state-owned companies in particular, opening the
country to foreign investment, and most relevantly to this project, a
stipulation for the country to move towards resource extraction and
export. Although the majority of IMF loans do come with market-rate
interest rates and often require collateral, both of which can be a
significant burden for countries requesting aid, SAPs are far more
powerful in terms of creating long-term subjugating economic
relations. SAPs push countries in the Global South to cheaply produce
and export goods to the Global North, where only then they are
realized as profit. SAPs push countries to denationalize basic
necessities and turn them over to multinational corporations in order
to qualify for loans.

### This project

This project seeks to explore the racial logic embedded in the SAPs,
beginning with Paula Chakravartty and Denise da Silva's collection
_Race, Empire, and the Crisis of the Subprime_. They note that while
Marxist geographer David Harvey's theory of _accumulation by
dispossession_ turns towards the social processes of dispossession
that are at capitalism's core, Harvey takes race for granted in his
writing because he notes simply the disproportionate burden of these
acts of dispossession on people of color without discussing the racial
logic that would allow such a burden to appear. Race and racism are
taken as "primitive" concepts over which modern capitalist forces take
hold. They argue that race continues to order accumulation in and of
itself, and specifically in the subprime mortgage crisis that Black
recipients of loans are continually configured to be outside of the
relationship of an economic transaction and the capacity to pay one
side of the trade.

But their discussion, while framed as a study of global capitalism and
arguing that "race as the _naturalized_ ways U.S. Americans deploy the
term cannot be the privileged and sole critical descriptor" of the
various manifestations of the logics of dispossession on the "others
of Europe," still stops short of studying dispossession across the
globe. Their collection does not touch on relationships between or
across nations, institutions that drive these processes forth, or how
the crises they discuss manifest elsewhere.

This will hopefully fulfill a complement to their discussion by
discussing debt and raciality as global concepts. While they focus on
U.S. banking institutions and the subprime mortgage loan, I will focus
on the IMF's crisis loans; while they critique the dispossession of
the "others of Europe" by focusing on Black and Latino/a homeowners, I
will focus on the (mis)handling of the 1997 Asian financial crisis.
More than just being a difference in topic or scope, I hope that this
positioning will enable my project to tie in their analysis of the
racial logic of debt into postcolonial theory and theories of
globalization.

### Setup

If you'd like to contribute to or explore the project and the steps
below are absolutely uninterpretable to you, please send me an email
to me at nathan.kim@yale.edu and I'll be happy to talk through it. So
sorry for any obtuseness here!

1. Install
   [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
   and [node](https://nodejs.org/en/download/) if you do not have them
   on your computer.

2. Download this repository by running the command below in a command
   line where you would like to download the project.

```
git clone https://github.com/18kimn/imf_loans
```

3. Open a terminal inside the repository and run `yarn` to install all
   of the packages required in this project.

4. Run `yarn start` or `yarn dev` in that terminal, then navigate to
   https://localhost:3000/ on a browser to see a demo of the project
   on your own computer.

5. Make edits to the project by modifying the files in the `src`
   directory. If you'd like to try out edits to the text, modify the
   markdown files in the `content/text` directory and then run
   `yarn render` on the command line.

6. If you'd like the change you've made to be permanent, check out a
   new Git branch, commit your changes, and open a pull request to
   send the change for my review.

### Technical details

The "body" of the project is created through the Vue 3.x framework,
scaffolded by the Vite toolchain. It's written in Typescript, using
the Material Design library as implemented by the Vuetify package.
Animations, cartography, and data viz parts in general are handled by
the d3 ecosystem. Tooling through yarn is also used for fast installs
and a nice developer experience.

Click any of the below links to learn more.

[Vue](https://vuejs.org/)

[Vite](https://vitejs.dev/)

[Typescript](https://www.typescriptlang.org/)

[Material Deisgn](https://material.io/design)

[Vuetify](https://vuetifyjs.com/en/)

[d3](https://d3js.org/)

[yarn](https://yarnpkg.com)

### Personal notes on learning

Some background: I started learning JavaScript in December of 2020, so
I've been learning it for about a year. I've done some projects in d3,
React, vanilla JS, and have background in data handling from work in
R.

I consider this project a learning experience for me because it's my
first project with Vue and Typescript. It's also my first project
where a considerable amount of text will be embedded in the website
itself (instead of hosted on a different medium), and required me to
think of a strategy to write and output academic text efficiently.

All of that to say, I'm grateful to have the opportunity to work on
this project for my thesis in the Ethnicity, Race, & Migration program
at Yale, and am _definitely_ open to helping others if any similar
hurdles are presented to you.
