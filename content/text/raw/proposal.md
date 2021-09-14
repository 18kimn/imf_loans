---
title: The IMF and Global Dispossession
subtitle: A senior project proposal
author: Nathan Kim
date: 2021-09-13
nocite: '@*'
---

### Summary

My project will explore the racial logic embedded in the International Monetary
Fund's structural adjustment programs (SAPs), focusing on a case study of South
Korea after the IMF bailout of South Korea in the 1997 Asian financial crisis.

### Introduction

Since its founding in 1944, the International Monetary Funds has amassed a total
of 705 billion Special Drawing Rights (SDRs) in spending capacity, or about \$1
trillion. As opposed to the World Bank's extensive general lending system, IMF
loans have played a pivotal role specifically during times of crisis. The
relatively small organization (of only \~2,300 staff members) with no subsidiary
organizations is able to move the global economy through these loans, millions
of people at a time, and its focus on low-to-middle-income countries during
crises means that the most vulnerable of the global population are affected by
its work.

The IMF's loans are not without caveats. Under the stated purpose of ensuring
loan repayment and financial stability, or "conditionality," the IMF requires
that loan-receiving countries also implement a set of macroeconomic policy
reforms known as Structural Adjustment Programs (SAPs). These include "purely"
economic measures like currency devaluation, austerity measures, and
restructuring or refinancing foreign debts, but also include liberalization of
markets broadly, privatization of state-owned companies in particular, opening
the country to foreign investment, and most relevantly to this project, a
stipulation for the country to move towards resource extraction and export.
Although the majority of IMF loans do come with market-rate interest rates and
often require collateral, both of which can be a significant burden for
countries requesting aid, SAPs are far more powerful in terms of creating
long-term subjugating economic relations. SAPs push countries in the Global
South to cheaply produce and export goods to the Global North, where only then
they are realized as profit.[^This is the main subject of
@smithImperialismTwentyFirstCentury2016] SAPs push countries to denationalize
basic necessities and turn them over to multinational corporations in order to
qualify for loans.[^See @ciafoneEndowingNeoliberalUniversity2005 for a detailed
history on Yale's relationship with privatizing Indonesian power.]

### My project

My project seeks to explore the racial logic embedded in the SAPs, beginning
with Paula Chakravartty and Denise da Silva's collection _Race, Empire, and the
Crisis of the Subprime_.[@chakravarttyAccumulationDispossessionDebt2012a] They
note that while Marxist geographer David Harvey's theory of _accumulation by
dispossession_ turns towards the social processes of dispossession that are at
capitalism's core, Harvey takes race for granted in his writing because he notes
simply the disproportionate burden of these acts of dispossession on people of
color without discussing the racial logic that would allow such a burden to
appear. Race and racism are taken as "primitive" concepts over which modern
capitalist forces take hold. They argue that race continues to order
accumulation in and of itself, and specifically in the subprime mortgage crisis
that Black recipients of loans are continually configured to be outside of the
relationship of an economic transaction and the capacity to pay one side of the
trade.[^See also @silvaGlobalIdeaRace for more from da Silva on this topic.]

But their discussion, while framed as a study of global capitalism and arguing
that "race as the _naturalized_ ways U.S. Americans deploy the term cannot be
the privileged and sole critical descriptor" of the various manifestations of
the logics of dispossession on the "others of Europe," still stops short of
studying dispossession across the globe. Their collection does not touch on
relationships between or across nations, institutions that drive these processes
forth, or how the crises they discuss manifest elsewhere.

My project will thus fulfill a complement to their discussion by discussing debt
and raciality as global concepts. While they focus on U.S. banking institutions
and the subprime mortgage loan, I will focus on the IMF's crisis loans; while
they critique the dispossession of the "others of Europe" by focusing on Black
and Latino/a homeowners, I will focus on the (mis)handling of the 1997 Asian
financial crisis. More than just being a difference in topic or scope, I hope
that this positioning will enable my project to tie in their analysis of the
racial logic of debt into postcolonial theory and theories of globalization.

I will explore this firstly through a paper that will give a history of the 1997
Asian financial crisis in South Korea and the IMF's response, focusing on the
criteria the IMF uses to approve a loan and the policies they attach to it.
These will mostly come from the IMF archives, found
[here](https://www.imf.org/en/About/Archives), and South Korean government
archives found [here](https://archives.go.kr/english/index.jsp).

I will explore this secondly in a creative medium, by creating a set of
interactive visualizations of the relationships my paper will discuss. These
will focus on import and export relationships held by loan recipient countries
before and after IMF loans, SAPs' role in investment from former imperial powers
into their formerly colonized countries, and a comparison of criteria used by
the IMF in different geographic contexts. Data will come from the Monitoring of
Fund Arrangements (MONA[^1]) database hosted publicly by the IMF, and will be
combined with trade datasets jointly authored by the World Integrated Trade
Solution (an initiative from the World Bank) and the United Nations Statistical
Division. The web page will be a single zoomable, scrollable world map, with
lines illustrating trade information and countries colored to denote loan
amount. Clicking any of these lines or countries displays more information on
the loan received and statistics on manufacturing exports over the next several
years. Next to a map will be a sidebar explaining the transformation of market
relations that John Smith and my paper will describe. The web page will be made
with the d3.js and Mapbox GL JS libraries in JavaScript, and data processing
will be done through the R language for statistical computing.

### Potential issues

The IMF reading rooms are currently closed to external visitors due to the
COVID-19 pandemic. Many of their materials are already hosted online and
viewable through the catalog page described above, but it will be difficult to
access the bulk of their resources for the forseeable future. I will work with
the IMF librarians on this point.

### Working Bibliography

[^1]:
    A confusing acronym (shouldn't it be MOFA?). See
    <https://www.imf.org/external/np/pdr/mona/index.aspx> for more info on this
    source.
