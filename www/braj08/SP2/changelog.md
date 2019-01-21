# Change Log PUSH

## 2019-01-21
<h3>Version 2</h2>
<h5>This version is ready for approval</h3>

### Repaired & fixed
- All comments from pull request have been repaired

### Added
- Facebook support
    - Ability to login or logout to Facebook account
    - Ability to see user's profile data
    - Working "widgets" weather and countdown to birthday implemented using user's profile data
    - Select pages user administers and ability to post on them
    - List of last posts on selected page

### Changed
- Instagram will not be implemented
- Changed not implemented feature into seperate page
- General logic methods have been moved into a separate js file
- Codebird library is now implemented using CDN
    - For some reason the only CDN version available has no method logout() that is part of the original library, but simply is not in the CDN version - user can’t be logged out :/
- Minor code improvements and changes

### Notes
- Facebook doesn't support posting on user's timelines since october 2018, therefore the PUSH app posts on page
- There are many errors from facebook anytime API call is made - this is because the website has to be running on https, otherwise the call is deemed unsecure (but still works)
- There has to be a URL of the website the call is coming from entered as valid URL in the FB App Dashboard, otherewise and error will ocure
- Instagram will not be implemented, this is the version for approval