This is a little app to help make cover pages. Just edit the json file with a regexp friendly id that acts as a keyword search, a skill level to put your best for forward, and a sentence to add if the job description matches. Note: there is a opening and closing that should also be changed. 

Then just paste in the job description and a cover letter will be created. The non-cover letter elements are hidden, so you can just print at that point. I prefer to print as pdf. To continue editing, or retry, just click on the letter to return to the previous view. 

The profile can now be saved to the remote server, that way, others can see your entire profile.

Test page running here: http://cm.2id.us

Formatting:
There is one reserved keyword for type ("coverLetter"), but other than that the type field is user defined. For the user-defined types, a section is created for each matching pattern. 
The Lvl field is used to order how things are presented. Values above 10 and below -10 are taken as headers and footers for the type defined. That affects the order that the sections are displayed. For headers and footers, the Match string does not need to match anything. For Lvl values between 10 and -10, they are only displayed if the Match String matches a job description value, and in the numeric order. 
The sections are there so you can have a skills section where you talk about technical topics, but then another personal section where you talk about how you might match the values or culture of the organization.

RE: pdf hyperlinks using Microsoft Windows. I have only been able to print to pdf while retaining links in Firefox/Pale Moon and the Edge browser. On the Edge browser didn't have page meta information in the corners. Native Chrome "Save to PDF" printing also worked without meta-information.
