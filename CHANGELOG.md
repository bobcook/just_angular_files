v0.1.3 Second half of non-paid redirect logic
* https://trello.com/c/e7Zq1X2U/426-8-as-a-user-directed-to-a-specific-page-of-the-site-i-should-return-to-that-page-after-logging-in

v0.1.2 Fix for chart height on page resize bug + anonymous / first half of non-paid redirect logic
* https://trello.com/c/0xkRakUl/422-bug-neuro-lifestyle-bar-charts-responsive-behavior
* abd8ba6 / https://trello.com/c/e7Zq1X2U/426-as-a-user-directed-to-a-specific-page-of-the-site-i-should-return-to-that-page-after-logging-in

v0.1.1 Various bug fixes
* https://trello.com/c/YwcZIFhD/429-bug-always-creating-new-assessments-instead-of-using-existing-assessments-on-prod
* https://trello.com/c/XomaLetQ/430-bug-new-accounts-are-seeing-please-log-in-page-regardless-of-subscription-status

v0.1.0: First tagged production comit
* c7db33b Delete unnecessary questions
* 6db4c98 fix engagement email api endpoint and json format
* 8f29383 Fixed activity tracker bugs - no chart appears if no quantities are logged for current week - weeks show wrong number of days
* 8726576 Added question marks to questions
* cc01c46 show/hide banner and assessment results
* 4b62014 remove "provide feedback" banner from home page
* 62bee20 Copy change * Swap labels for lifestyle results graph * Change no flash copy for assesment and games
* de118ba change order of assessments to MBS->Q1->Q2
* 0a5d0be edit assessment-related copy -remove "you do not activities" from my activities -show "My Assessments" link to all logged-in user
* f6c90d8 restore Google analytics by moving segment bit before adobe bit
* 3e6c42b Update nav-tabs
* e45385a Fixes card margins in My Activities
* c1322a7 Assessment Graph styles * Update colors of lifestyle graph * Add zone legend
* 14fea34 Styles for Retake Assessment modal
* 2158008 Fix friday bar alignment and remove mo/dy - v2
* fb63066 Update nav label for My Assesment Results
* 8506783 Update copy on assesment results
* 2d2c79c Use flash detection for assessments/games and not touch  - change to hasFlash
* 73ebbe5 fix info box on my assessments
* 839de2c fix: show recommendations for last completed assessment
* 9a1e3f4 rename variable on assessments page
* 49e2249 don't run analytics on localhost
* 0991f4f lock angular and angular-animate (fixes local dev environments)
