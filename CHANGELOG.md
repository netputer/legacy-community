<a name="0.2.0"></a>
## 0.2.0 (2014-10-09)


#### Bug Fixes

* Temporary using `start` to turning pages ((53833e52))
* wrong month ((12aaa5aa))


#### Features

* Add navigation tabs to group list ((ecea8c87))
* Add `subject_type` to `GroupService.getGroupList` ((af6ba5ea))
* Split `main.css` into different modules ((c010127c))


<a name="0.1.0"></a>
## 0.1.0 (2014-09-24)


#### Bug Fixes

* Using old `ga.js` to prevent error ((d2def09b))
* `HttpInterceptor.js` compress error ((da3d90eb))
* Only check unread notifications count to logged in user ((2be3af64))
* Put `analytics.js` before `app.js` ((81b2de1b))
* Update development dependencies ((4274aafb))
* Remove async of `analytics.js` ((c2f3c3bf))
* Empty placeholder when post a comment ((e5a7d8ec))
* Only confirm once to join ((51d1e9c7))
* Using placeholder instead of real message in post field ((80549660))
* Show login when guest want to join group ((9b3dce7e))
* Reject promise when user not logged in ((c0bcad52))
* Limit most uploadable pictures to 9 ((0439e0a7))
* Return to group page when topic deleted ((ac181e19))
* Better $element position detect ((1d72e563))
* Pagination style ((25e5125c))
* Hide input[type=file] in iE8 ((b0a0b2db))
* United fonts ((0f5bbd78))
* IE caches AJAX request ((824c912c))
* IE8 without `Date.now()` ((d0a5af44))
* IE8 without `Array.prototype.indexOf` ((d95cc2b2))
* Topic pictures display problem in topic list under IE ((7aba6a90))
* Real delete comment ((09f23e17))
* Return to group page after post a new topic ((270cd87d))
* Convert empty string of `pictures` to `undefined` ((f6356404))
* Only one picture can be uploaded when reply ((1c69a3ac))
* Auto set message when posting pictures without message ((85bbf1a6))
* get unread notifications count without any cache ((76005ec6))
* Better way to handle `onScroll` ((0c3b1531))
* Get scroll height every times ((63a1c2ea))
* Reply button in meta shoud remove parent reply ((d09d8353))
* Focus on textarea when reply button clicked ((c2618d47))
* Different style in modal and entire page ((4fc5c758))
* Scroll event in entire topic page ((e9bd9980))
* Better way to detect IE ((f2a5332a))
* Dropdown menu in IE ((d7005e37))
* Better way to find members ((27bdbb25))
* Rearrange infos in `<head>` ((865f8634))
* Images path in staging, again ((292c35e2))
* Better way to load more topics ((00516c11))
* URL rewrite in local environment ((178de28d))
* Images path in staging ((4c0dab76))
* Send CORS request with cookies ((a1791a8a))
* Better way to detect unread notifications count ((4ed104cf))


#### Features

* Send source in every request ((4f94e747))
* Add HTTP Interceptor ((63e333d1))
* Refactor grunt build flow ((48f1d604))
* Add Google Analytics ((efc74433))
* Add `grunt-ng-annotate` ((6139b5c8))
* Show group in topic page ((4875380c))
* Return to group in post page ((5e8c1932))
* Confirm to join when post comment in group which haven't joined ((fc2ae341))
* Show group name in post page ((39f8e9aa))
* United nickname length ((e4b4185a))
* Remove uploaded pictures ((08da2f9b))
* Auto set message when uploaded pictures without message ((e64b2e0c))
* Better members management ((db24b9be))
* Using same origin API proxy for IE ((34c70d19))


<a name="0.0.1"></a>
### 0.0.1 (2014-09-17)

First Blood
