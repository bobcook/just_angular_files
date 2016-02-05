module SeedData
  module AssessmentQuestions
    def self.seed
      [
        {
          text: 'What is your date of birth?',
          order: 1,
          assessment_id: 1,
          type: 'AssessmentQuestionDate'
        },
        {

          text: 'On a typical day, about how many hours do you sleep?',
          external_recommendation_id: '00105',
          answer_options: %w(Less\ than\ 4\ hours
                             4\ -\ 5\ hours
                             6\ -\ 7\ hours
                             8\ hours\ or\ more),
          answer_values: %w(4 3 2 1),
          order: 7,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 3
        },
        {
          text: 'How many relatives (by birth or marriage) do you see or hear from at least once a month?',
          external_recommendation_id: '00205',
          answer_options: %w(None
                             1\ or\ 2
                             3\ or\ more),
          answer_values: %w(4 3 1),
          order: 8,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 5
        },
        {
          text: 'How many servings of fish (including shellfish) do you eat per week?',
          external_recommendation_id: '00313',
          answer_options: %w(4\ or\ more\ servings
                             2\ or\ 3\ servings
                             1\ serving
                             None),
          answer_values: %w(1 2 3 4),
          order: 9,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'On average, how many days per week do you walk at least 20 minutes at a time?',
          external_recommendation_id: '00401',
          answer_options: %w(Never
                             1\ or\ 2\ days
                             3\ or\ 4\ days
                             5\ or\ more\ days),
          answer_values: %w(4 3 2 1),
          order: 10,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 1
        },
        {
          text: 'Do you continue to get educated in the classroom, online, or on the job?',
          external_recommendation_id: '00503',
          answer_options: %w(Never
                             Rarely
                             Often),
          answer_values: %w(4 3 1),
          order: 11,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 2
        },
        {
          text: 'How often do you take prescription or over-the-counter (OTC) medications to help you sleep?',
          external_recommendation_id: '00106',
          answer_options: %w(Almost\ every\ day
                             Once\ in\ a\ while
                             Never),
          answer_values: %w(4 3 1),
          order: 12,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 3
        },
        {
          text: 'How often do you talk to or see the relative with whom you have the most contact?',
          external_recommendation_id: '00207',
          answer_options: %w(Never
                             Seldom
                             Often
                             Very\ often),
          answer_values: %w(4 3 2 1),
          order: 13,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 5
        },
        {
          text: 'Do you take fish oil or omega-3 supplements?',
          external_recommendation_id: '00314',
          answer_options: %w(Yes
                             No),
          answer_values: %w(1 4),
          order: 14,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'How much time do you spend per week doing aerobic exercise?',
          external_recommendation_id: '00402',
          answer_options: %w(None
                             Less\ than\ 30\ minutes\ per\ week
                             30\ or\ more\ minutes\ per\ week),
          answer_values: %w(4 3 1),
          order: 15,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 1
        },
        {
          text: 'Do you seek opportunities to learn new skills (languages, music, art, technology, sports, cooking, etc.)?',
          external_recommendation_id: '00501',
          answer_options: %w(Never
                             Rarely
                             Often),
          answer_values: %w(4 3 1),
          order: 16,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 2
        },
        {
          text: 'How many of the following have you gone through in the past year: marital separation or divorce, retirement or loss of job, business failure, family conflict, major personal injury or illness, major violence, death or major illness of a spouse or close family member, or other major stress?',
          external_recommendation_id: '00101',
          answer_options: %w(None
                             1
                             2\ or\ more),
          answer_values: %w(1 3 4),
          order: 17,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 3
        },
        {
          text: 'How many relatives (by birth or marriage) do you feel you could reach out to for help or talk with about private matters?',
          external_recommendation_id: '00206',
          answer_options: %w(None
                             1\ or\ 2
                             3\ or\ more),
          answer_values: %w(4 3 1),
          order: 18,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 5
        },
        {
          text: 'How many servings (about 1 oz) of nuts do you consume per week?',
          external_recommendation_id: '00307',
          answer_options: %w(4\ or\ more\ servings
                             2\ or\ 3\ servings
                             1\ serving
                             None),
          answer_values: %w(1 2 3 4),
          order: 19,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'How much time do you spend per week doing weight or strength training?',
          external_recommendation_id: '00403',
          answer_options: %w(None
                             Less\ than\ 30\ minutes\ per\ week
                             30\ or\ more\ minutes\ per\ week),
          answer_values: %w(4 3 1),
          order: 20,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 1
        },
        {
          text: 'Do you generally attend cultural events (theatre, concerts, museums, galleries)?',
          external_recommendation_id: '00502',
          answer_options: %w(Never
                             Rarely
                             Often),
          answer_values: %w(4 3 1),
          order: 21,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 2
        },
        {
          text: 'In the last year, have you felt sad, down, or depressed for 2 weeks or more in a row?',
          external_recommendation_id: '00104',
          answer_options: %w(Yes
                             No),
          answer_values: %w(4 1),
          order: 22,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 3
        },
        {
          text: 'Which of the following most closely describes your parents\' relationship during your childhood',
          external_recommendation_id: '00201',
          answer_options: %w(No\ divorce/little\ or\ no\ strife
                             Divorce/little\ or\ no\ strife
                             No\ divorce/strife
                             Divorce/much\ strife),
          answer_values: %w(1 2 3 4),
          order: 23,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 5
        },
        {
          text: 'How many servings of processed foods (such as doughnuts, potato chips, desserts, etc.) do you eat per week?',
          external_recommendation_id: '00308',
          answer_options: %w(4\ or\ more\ servings
                             2\ or\ 3\ servings
                             1\ serving
                             None),
          answer_values: %w(4 3 2 1),
          order: 24,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'Which of the following best describes your activity level at work?',
          external_recommendation_id: '00405',
          answer_options: %w(Sedentary\ (mostly\ at\ a\ desk)
                             Low\ (requires\ some\ light\ walking)
                             Moderate\ (walk\ quite\ a\ bit\ without\ lifting\ or\ carrying\ heavy\ objects)
                             High\ (lots\ of\ walking\ and\ lifting,\ climbing\ stairs,\ or\ walking\ uphill)),
          answer_values: %w(4 3 2 1),
          order: 25,
          assessment_id: 1,
          type: 'AssessmentQuestionRadio',
          pillar_id: 1
        },
        {
          text: 'Do you routinely read newspapers, books, and magazines?',
          external_recommendation_id: '00504',
          answer_options: %w(Never
                             Rarely
                             Often),
          answer_values: %w(4 3 1),
          order: 1,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 2
        },
        {
          text: 'In the last year, how much financial stress have you experienced?',
          external_recommendation_id: '00102',
          answer_options: %w(Little\ or\ none
                             Moderate
                             High\ or\ severe),
          answer_values: %w(1 3 4),
          order: 2,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 3
        },
        {
          text: 'What is your relationship status?',
          external_recommendation_id: '00202',
          answer_options: %w(Married\ or\ lifelong\ cohabitation
                             Never\ married
                             Divorced
                             Widowed),
          answer_values: %w(1 1 3 3),
          order: 3,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 5
        },
        {
          text: 'How often do you eat breakfast in a typical week?',
          external_recommendation_id: '00301',
          answer_options: %w(Everyday
                             4\ or\ more\ days\ per\ week
                             2\ or\ 3\ days\ per\ week
                             Never),
          answer_values: %w(1 2 3 4),
          order: 4,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'How much time do you spend sitting every day, including time spent driving, working, watching TV, etc.?',
          external_recommendation_id: '00406',
          answer_options: %w(1\ hour\ or\ less
                             1\ to\ 3\ hours
                             4\ to\ 6\ hours
                             7\ or\ more\ hours),
          answer_values: %w(1 2 3 4),
          order: 5,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 1
        },
        {
          text: 'How often do you experience stress at home or work?',
          external_recommendation_id: '00103',
          answer_options: %w(Never
                             Sometimes
                             Often
                             Constantly),
          answer_values: %w(1 2 3 4),
          order: 6,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 3
        },
        {
          text: 'What is your living arrangement?',
          external_recommendation_id: '00204',
          answer_options: %w(Live\ alone
                             Live\ with\ partner/spouse
                             Live\ with\ roommate(s)),
          answer_values: %w(3 1 2),
          order: 8,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 5
        },
        {
          text: 'How many servings of vegetables do you eat per day?',
          external_recommendation_id: '00304',
          answer_options: %w(4\ or\ more\ servings
                             2\ or\ 3\ servings
                             1\ serving
                             None),
          answer_values: %w(1 2 3 4),
          order: 9,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'On average, how often do you do flexibility exercise?',
          external_recommendation_id: '00404',
          answer_options: %w(None
                             Less\ than\ 30\ minutes\ per\ week
                             30\ or\ more\ minutes\ per\ week),
          answer_values: %w(4 3 1),
          order: 10,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 1
        },
        {
          text: 'Of your friends, how many do you feel you could call on for help or to discuss private matters?',
          external_recommendation_id: '00208',
          answer_options: %w(None
                             1\ or\ 2
                             3\ or\ more),
          answer_values: %w(4 3 1),
          order: 11,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 5
        },
        {
          text: 'Do you take a supplement that contains at least 400 international units (IU) of vitamin D?',
          external_recommendation_id: '00315',
          answer_options: %w(Yes
                             No),
          answer_values: %w(1 4),
          order: 12,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'Of your friends, how many do you see or hear from at least once a month?',
          external_recommendation_id: '00209',
          answer_options: %w(None
                             1\ or\ 2
                             3\ or\ more),
          answer_values: %w(4 3 1),
          order: 13,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 5
        },
        {
          text: 'How many servings of processed meats do you have per week?',
          external_recommendation_id: '00312',
          answer_options: %w(8\ or\ more\ servings
                             6\ or\ 7\ servings
                             4\ or\ 5
                             3\ or\ less),
          answer_values: %w(4 3 2 1),
          order: 14,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'When one of your friends or family members has an important decision to make, how often do they talk to you about it?',
          external_recommendation_id: '00210',
          answer_options: %w(Never
                             Seldom
                             Often
                             Very\ often),
          answer_values: %w(4 3 2 1),
          order: 15,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 5
        },
        {
          text: 'How many servings of red meats do you have per week?',
          external_recommendation_id: '00310',
          answer_options: %w(8\ or\ more\ servings
                             6\ or\ 7\ servings
                             4\ or\ 5
                             3\ or\ less),
          answer_values: %w(4 3 2 1),
          order: 16,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'When you have an important decision to make, how often do you talk to a friend about it?',
          external_recommendation_id: '00211',
          answer_options: %w(Never
                             Seldom
                             Often
                             Very\ often),
          answer_values: %w(4 3 2 1),
          order: 17,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 5
        },
        {
          text: 'How many servings of legumes, such as beans, lentils, and chickpeas, do you eat per week?',
          external_recommendation_id: '00306',
          answer_options: %w(4\ or\ more\ servings
                             2\ or\ 3\ servings
                             1\ serving
                             None),
          answer_values: %w(1 2 3 4),
          order: 18,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'How often do you participate in group activities (religious services, clubs, social groups, craft groups)?',
          external_recommendation_id: '00212',
          answer_options: %w(Never
                             Seldom
                             Often
                             Very\ often),
          answer_values: %w(4 3 2 1),
          order: 19,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 5
        },
        {
          text: 'How many servings of poultry do you have per week?',
          external_recommendation_id: '00311',
          answer_options: %w(4\ or\ more\ servings
                             2\ or\ 3\ servings
                             1\ serving
                             None),
          answer_values: %w(1 2 3 4),
          order: 20,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'Are you a vegetarian or vegan?',
          external_recommendation_id: '00309',
          answer_options: %w(Yes
                             No),
          answer_values: %w(1 3),
          order: 21,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'How many servings of dairy, such as milk, cheese, and yogurt, do you eat per week?',
          external_recommendation_id: '00305',
          answer_options: %w(2\ or\ more\ servings
                             1\ serving
                             None),
          answer_values: %w(1 3 4),
          order: 22,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'How many servings of fruit do you eat per day?',
          external_recommendation_id: '00303',
          answer_options: %w(4\ or\ more\ servings
                             2\ or\ 3\ servings
                             1\ serving
                             None),
          answer_values: %w(1 2 3 4),
          order: 23,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'How many servings of whole grains, such as whole-wheat bread, 100% bran cereal, and brown rice, do you eat per day?',
          external_recommendation_id: '00302',
          answer_options: %w(4\ or\ more\ servings
                             2\ or\ 3\ servings
                             1\ serving
                             None),
          answer_values: %w(1 2 3 4),
          order: 24,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'Do you take other vitamins, minerals, or supplements?',
          external_recommendation_id: '00316',
          answer_options: %w(Yes
                             No),
          answer_values: %w(1 4),
          order: 25,
          assessment_id: 3,
          type: 'AssessmentQuestionRadio',
          pillar_id: 4
        },
        {
          text: 'Processing Speed',
          external_recommendation_id: '11005',
          order: 1,
          assessment_id: 2,
        },
        {
          text: 'Short Term Memory',
          external_recommendation_id: '11001',
          order: 2,
          assessment_id: 2,
        },
        {
          text: 'Sustained Attention',
          external_recommendation_id: '11004',
          order: 3,
          assessment_id: 2,
        },
        {
          text: 'Working Memory',
          external_recommendation_id: '11002',
          order: 4,
          assessment_id: 2,
        },
        {
          text: 'Cognitive Flexibility',
          external_recommendation_id: '11006',
          order: 5,
          assessment_id: 2,
        },
        {
          text: 'Executive Function',
          external_recommendation_id: '11003',
          order: 6,
          assessment_id: 2,
        },
        {
          text: 'Delayed Short Term Memory',
          external_recommendation_id: '11001',
          order: 7,
          assessment_id: 2,
        },
      ]
    end
  end
end
