<!DOCTYPE html>
<!--[if lt IE 9]>
<html class="lt-ie9" lang="cs">
<![endif]-->
<!--[if gte IE 9]><!-->
<html class="" lang="cs">
<!--<![endif]-->
<head>

  <meta charset="UTF-8">
  <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <title>{{ projectName }}</title>

  <meta name="description" content="{% block description %}{% endblock %}">
  <!-- <meta name="keywords" content="Project keywords" /> -->

  <meta name="author" content="" />
  <meta name="copyright" content="" />

  <!-- Favicons -->
  {% include './includes/_favicon.swig' %}

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,300i,400,400i,500,700,900&amp;subset=latin-ext" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" media="screen" href="./styles/main.css?timestamp={{ timestamp }}">

  <!-- Important Scripts -->
  <script src="./scripts/vendor.js?timestamp={{ timestamp }}"></script>

  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  {% block head %}
  {% endblock %}

  <body class="{% block bodyClass %}{% endblock %}">

    {% include '_header.swig' %}

    <main class="main">
      {% block main %}{% endblock %}
    </main>

    {% include '_footer.swig' %}

    <script src="./scripts/main.js?timestamp={{ timestamp }}"></script>
    {% block scriptsFooter %}{% endblock %}

  </body>
</html>