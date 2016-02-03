describe('AssessmentStatus', function () {
  beforeEach(loadApp);

  beforeEach(inject(function (AssessmentStatus) {
    this.AssessmentStatus = AssessmentStatus;
  }));

  describe('.getQuestionnaires', function () {
    it('returns questionnaires', function () {
      const assessmentGroup = { userAssessments: [
        { completed: true, id: 1, type: 'AssessmentQuestionnaire' },
        { completed: false, id: 2, type: 'AssessmentMBS' },
        { completed: false, id: 3, type: 'AssessmentQuestionnaire' },
      ] };
      const questionnaires =  [
        { completed: true, id: 1, type: 'AssessmentQuestionnaire' },
        { completed: false, id: 3, type: 'AssessmentQuestionnaire' },
      ] ;
      const expectedQuestionnaires =
        this.AssessmentStatus.getQuestionnaires(assessmentGroup);

      expect(expectedQuestionnaires).to.eql(questionnaires);
    });
  });

  describe('.getMBS', function () {
    it('returns MBS assessment', function () {
      const assessmentGroup = { userAssessments: [
        { completed: true, id: 1, type: 'AssessmentQuestionnaire' },
        { completed: false, id: 2, type: 'AssessmentMBS' },
        { completed: false, id: 3, type: 'AssessmentQuestionnaire' },
      ] };
      const MBS = { completed: false, id: 2, type: 'AssessmentMBS' };
      const expectedMBS = this.AssessmentStatus.getMBS(assessmentGroup);

      expect(expectedMBS).to.eql(MBS);
    });
  });

  describe('.setSubmitButtonText', function () {
    it('returns result text if first questionnaire is completed', function () {
      const assessmentGroup = { userAssessments: [
        { completed: true, id: 1, type: 'AssessmentQuestionnaire' },
        { completed: false, id: 2, type: 'AssessmentMBS' },
        { completed: false, id: 3, type: 'AssessmentQuestionnaire' },
      ] };
      const text =
        this.AssessmentStatus.setSubmitButtonText(assessmentGroup);

      expect(text).to.eq('Get Your Results');
    });

    it('returns continue if 1st questionnaire is not completed', function () {
      const assessmentGroup = { userAssessments: [
        { completed: false, id: 1, type: 'AssessmentQuestionnaire' },
        { completed: false, id: 2, type: 'AssessmentMBS' },
        { completed: false, id: 3, type: 'AssessmentQuestionnaire' },
      ] };
      const text =
        this.AssessmentStatus.setSubmitButtonText(assessmentGroup);

      expect(text).to.eq('Continue');
    });

  });

  describe('.showAssessmentBanner', function () {
    it('returns true if there are no completed assessment', function () {
      const hasCompleted = false;
      const lastIsStarted = undefined;
      const lastIsCompleted = undefined;
      const expectedResults =
        this.AssessmentStatus.showAssessmentBanner(
          hasCompleted,
          lastIsStarted,
          lastIsCompleted
        );

      expect(expectedResults).to.eq(true);
    });

    context('there are completed assessments', function () {
      it('returns false if not started', function () {
        const hasCompleted = true;
        const lastIsStarted = false;
        const lastIsCompleted = false;
        const expectedResults =
          this.AssessmentStatus.showAssessmentBanner(
            hasCompleted,
            lastIsStarted,
            lastIsCompleted
          );

        expect(expectedResults).to.eq(false);
      });

      it('returns true if started', function () {
        const hasCompleted = true;
        const lastIsStarted = true;
        const lastIsCompleted = false;
        const expectedResults =
          this.AssessmentStatus.showAssessmentBanner(
            hasCompleted,
            lastIsStarted,
            lastIsCompleted
          );

        expect(expectedResults).to.eq(true);
      });

      it('returns false if completed', function () {
        const hasCompleted = true;
        const lastIsStarted = true;
        const lastIsCompleted = true;
        const expectedResults =
          this.AssessmentStatus.showAssessmentBanner(
            hasCompleted,
            lastIsStarted,
            lastIsCompleted
          );

        expect(expectedResults).to.eq(false);
      });

    });
  });

  describe('.showAssessmentResults', function () {
    it('returns true if there are completed assessment', function () {
      const hasCompleted = true;
      const expectedResults =
        this.AssessmentStatus.showAssessmentResults(hasCompleted);

      expect(expectedResults).to.eq(true);
    });

    it('returns false if there are no completed assessment', function () {
      const hasCompleted = false;
      const expectedResults =
        this.AssessmentStatus.showAssessmentResults(hasCompleted);

      expect(expectedResults).to.eq(false);
    });
  });
});
