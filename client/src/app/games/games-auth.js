const $gamesAuth = function (ApiRoutes, $http, $postHref, $auth) {
  'ngInject';

  const gameNameMap = {
    'eBubble Topia': 'BubbleTopia',
    'eWord Smith': 'WordSmith',
    'eMemory Maze': 'MemoryMaze',
    'eHappy Seeker': 'HappySeeker',
    'eEmotion Match': 'EmotionMatch',
    'eCharacter Builder': 'CharacterBuilder',
    'eFace Shifter': 'FaceShifter',
    'eThink Memory': 'EThinkMemory',
    'eMotion Wellbeing': 'eMotionWellbeing',
    'eThink Balance': 'eThinkBalance',
    'eThink Focus': 'EThinkFocus',
    'eThink on Target': 'EThinkOnTarget',
    'eThink Simon Says': 'EThinkSimonSays',
    'eFaces and Names': 'EFacesandNames',
    'eBody Language Cues': 'EBodyLanguage',
  };

  return {
    authenticate: function (gameName) {
      // First, retrieve the SAMLRequest to submit to our SAML IdP
      // endpoint
      $http.post(ApiRoutes.MBS_SAML_REQUEST, {
        headers: { Accept: 'application/json' },
      }).then(function (response) {
        const data = {
          'SAMLRequest': response.data.samlRequest,
          'RelayState': gameNameMap[gameName],
          'authToken': $auth.sessionToken(),
        };

        // Perform synchronous POST via form submission to assessments auth
        // endpoint, which will redirect to MBS assessments page.
        //
        // Need to POST because authToken + SAMLRequest are too long to
        // fit into query params
        $postHref(ApiRoutes.MBS_AUTH, data);
      });
    },
  };
};

export default $gamesAuth;
