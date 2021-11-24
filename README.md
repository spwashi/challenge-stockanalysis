# Hello!
My name is Samwashington. 
This application was written with typescript for the sake of clarity and documentation.

## Installation / Execution

`yarn; yarn start`

## Description
This is an application that takes financial data in the form of a TSV file, and outputs answers to three questions to a text file.

## Inputs and Outputs
Output is a text file: `_data/out.txt`

Input is a data file:  `_data/data.dat`

## Requirements / Goals
 - The application should:
   - Run in Node.js 
   - Take data in the form of a data.dat file 
     - This file contains tab-delimited tabular data
     - Each record is structured as follows:
       - Date   (Date:    the date of trading)
       - Open   (Decimal: the value of each share at the beginning of the trading day)
       - High   (Decimal: the highest value of each share during the trading day)
       - Low    (Decimal: the lowest value of each share during the trading day)
       - Close  (Decimal: the value of each share at the end of the trading day)
       - Volume (Number:  the number of shares being sold)
   - Produce a text file with the answers to three provided questions
     - a) What day was there the largest variance between the High and Low?
     - b) What was the average volume for the month of July 2012?
     - c) What is the maximum profit potential per share? And what day(s) would you have had
       to buy low and sell high to get this maximum profit?
 - Code should be:
   - Well documented
   - Reusable and stable
   - Organized
   - Readable

## Design considerations
 - Should run on Node.JS
 - Should be extensible
 - Should be flexible
 - Should involve a data layer
 - Should include caching