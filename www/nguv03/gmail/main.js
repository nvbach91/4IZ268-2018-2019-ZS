// in google developer console
// create a project, add gmail api, plus api and contacts api
// generate API key
// enter authorized JavaScript origin while creating OAuth client ID
// for example use http://localhost:5500 if using live server

const App = {};

App.CLIENT_ID = '210723404057-pffjv397ss64mf30rdag1ei2g8tvqdlr.apps.googleusercontent.com';
App.API_KEY = 'AIzaSyBklnZIea-NFuupxxXDegXVPK4yHXXSwxE';
App.DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'];
App.SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send';

App.initClient = () => {
  const authorizeButton = $('#authorize_button');
  const signoutButton = $('#signout_button');

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      authorizeButton.hide();
      signoutButton.show();
      App.fetchUserInfo();
    } else {
      authorizeButton.show();
      signoutButton.hide();
    }
  };

  gapi.client.init({
    apiKey: App.API_KEY,
    clientId: App.CLIENT_ID,
    discoveryDocs: App.DISCOVERY_DOCS,
    scope: App.SCOPES,
  }).then(
    () => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.click(() => {
        gapi.auth2.getAuthInstance().signIn();
      });
      signoutButton.click(() => {
        gapi.auth2.getAuthInstance().signOut();
      });
    }, (err) => {
      console.error(err);
      App.warn('Could not sign in<br>' + err.message || err.details);
    }
  );
};

App.warn = (msg) => {
  App.modal.find('.modal-body p').html(msg);
  App.modal.modal();
};

App.bindEmailForm = () => {
  const messageForm = $('#message-form');
  const recipientInput = messageForm.find('input[placeholder="RECIPIENT"]');
  const subjectInput = messageForm.find('input[placeholder="SUBJECT"]');
  const messageInput = messageForm.find('textarea[placeholder="MESSAGE"]');
  const messageFormSubmitButton = messageForm.find('button');
  const clearEmailForm = () => {
    recipientInput.val('');
    subjectInput.val('');
    messageInput.val('');
    messageFormSubmitButton.prop('disabled', false);
  };
  messageForm.submit((e) => {
    e.preventDefault();
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      App.warn('You must sign in first');
      return false;
    }
    messageFormSubmitButton.prop('disabled', true);
    const emailRaw = `To: ${recipientInput.val()}\r\nSubject: ${subjectInput.val()}\r\n\r\n${messageInput.val()}`;
    //console.log(emailRaw);
    const sendRequest = gapi.client.gmail.users.messages.send({
      userId: 'me',
      resource: { raw: btoa(emailRaw).replace(/\+/g, '-').replace(/\//g, '_') },
    });
    sendRequest.execute((e) => {
      if (e.code) {
        App.warn('Email was not sent due to an error<br>' + e.code + ': ' + e.message);
      } else {
        App.warn('Email was sent successfully<br>ID: ' + e.id);
      }
      clearEmailForm();
    });
  });
};

App.fetchUserInfo = () => {
  gapi.client.load('plus', 'v1', () => {
    gapi.client.plus.people.get({ userId: 'me' }).execute((resp) => {
      const messageForm = $('#message-form');
      const displayName = resp.displayName;
      const email = resp.emails[0].value;
      messageForm.find('input[placeholder="USERNAME"]').val(displayName);
      messageForm.find('input[placeholder="EMAIL"]').val(email);
      messageForm.find('#user-info').css({ display: 'flex' });
    });
  });
};

$(document).ready(() => {
  $.ajaxSetup({ cache: true });
  $.getScript('https://apis.google.com/js/api.js').done((script, textStatus) => {
    gapi.load('client:auth2', App.initClient);
  }).fail((jqxhr, settings, exception) => {
    console.error('Failed to load Google API scripts');
  });
  App.modal = $('#modal');
  App.bindEmailForm();
});
