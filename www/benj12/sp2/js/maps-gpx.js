/*
 * maps.gpx
 *   Copyright 2009-2016 WATANABE Hiroaki
 *   Released under the MIT license
 */

// namespace
function MapsGPX() {
  this.initialize.apply(this, arguments);
}

// constants, do not change these value
MapsGPX.VERSION = '4.3.1'; // NOT RELEASED YET
MapsGPX.EXTENSIONS = [
  'InputFileControl',
];
MapsGPX.ELEMENTS = {
  AGEOFDGPSDATA: 'ageofdgpsdata',
  AUTHOR: 'author',
  BOUNDS: 'bounds',
  CMT: 'cmt',
  COPYRIGHT: 'copyright',
  DESC: 'desc',
  DGPSID: 'dgpsid',
  ELE: 'ele',
  EMAIL: 'email',
  EXTENSIONS: 'extensions',
  FIX: 'fix',
  GEOIDHEIGHT: 'geoidheight',
  GPX: 'gpx',
  HDOP: 'hdop',
  KEYWORDS: 'keywords',
  LICENSE: 'license',
  LINK: 'link',
  MAGVAR: 'magvar',
  METADATA: 'metadata',
  NAME: 'name',
  NUMBER: 'number',
  PDOP: 'pdop',
  PT: 'pt',
  RTE: 'rte',
  RTEPT: 'rtept',
  SAT: 'sat',
  SRC: 'src',
  TEXT: 'text',
  TIME: 'time',
  TRK: 'trk',
  TRKPT: 'trkpt',
  TRKSEG: 'trkseg',
  TYPE: 'type',
  VDOP: 'vdop',
  WPT: 'wpt',
  YEAR: 'year'
};
MapsGPX._sequence = 0;
MapsGPX.nextval = function() {
  return ++MapsGPX._sequence;
};

// global properties, you can change
MapsGPX.strict        = true;
MapsGPX.join_trkseg   = true;
MapsGPX.cache_script  = true;

// layout, auto detect
MapsGPX.basedir = (function() {
  var scripts = document.getElementsByTagName('script'),
      re = new RegExp('/maps-gpx\.js.*'),
      i, l, src;
  for ( i = 0, l = scripts.length; i < l; ++i ) {
    src = scripts.item(i).getAttribute('src');
    if ( re.test(src) ) {
      return src.replace(re, '');
    }
  }
  return '.';
})();
MapsGPX.plugin_dir    = [MapsGPX.basedir, 'plugins'].join('/');
MapsGPX.scrip_loader  = 'loader.js';
MapsGPX.style_loader  = 'loader.css';

//--------------------------------------
// static methods - common util
//
MapsGPX.isSafari = function() {
  return /Version\/[\d\.]+.*Safari/.test(navigator.userAgent) ? true : false;
};
MapsGPX.merge = function() {
  var items = Array.prototype.slice.call(arguments), i, l, attr, merged = items[0] || {};
  for( i = 1, l = items.length; i < l ; ++i )
    for ( attr in items[i] )
      if (items[i].hasOwnProperty(attr))
        merged[attr] = items[i][attr];
  return merged;
};
MapsGPX.parseQueryString = function(/* usually 'location.search' */qstring) {
  var params = {}, str, pairs, i, l, pair;
  if ( qstring ) {
    str = qstring.match(/^\?/) ? qstring.substring(1) : qstring;
    pairs = str.split(/[;&]/);
    for ( i = 0, l = pairs.length; i < l; ++i) {
      pair = pairs[i].split('=');
      if ( pair[0] ) {
        if ( pair[1] ) {
          params[pair[0].trim()] = decodeURIComponent(pair[1].trim());
        } else {
          params[pair[0].trim()] = '';
        }
      }
    }
  }
  return params;
};
MapsGPX.parseXML = function(str) {
  if ( typeof ActiveXObject != 'undefined' && typeof GetObject != 'undefined' ) {
    var doc = new ActiveXObject('Microsoft.XMLDOM');
    doc.loadXML(str);
    return doc;
  }
  if ( typeof DOMParser != 'undefined' ) {
    return (new DOMParser()).parseFromString(str, 'text/xml');
  }
  throw( new Error('Cannot parse string as XML stream.') );
};
MapsGPX.createXMLHttpRequest = function() {
  try {
    if ( typeof ActiveXObject != 'undefined' ) {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } else if ( window['XMLHttpRequest'] ) {
      return new XMLHttpRequest();
    }
  } catch(e) {
    throw( new Error('Cannot create XmlHttpRequest object.') );
  }
  return null;
};
MapsGPX.resolveAsBlob = function(src) {
  if ((src instanceof Blob) || (src instanceof File)) {
    return Promise.resolve(src);
  } else if (typeof src == 'string') {
    return new Promise(function(resolve, reject) {
      var xhr = MapsGPX.createXMLHttpRequest();
      xhr.open('GET', src, true);
      xhr.responseType = 'blob';
      xhr.onload = function(ev) {
        if (this.readyState === 4 ) {
          if (this.status === 200 || this.status === 0 ) {
            resolve(this.response);
          }
        }
      };
      xhr.send();
    });
  }
};
MapsGPX.resolveAsArrayBuffer = function(src) {
  return MapsGPX.resolveAsBlob(src).then(function(blob) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function(event) {
        resolve(event.target.result);
      };
      reader.readAsArrayBuffer(blob);
    });
  });
};
MapsGPX.resolveAsObjectURL = function(src) {
  return MapsGPX.resolveAsBlob(src).then(function(blob) {
    return new Promise(function(resolve, reject) {
      resolve(URL.createObjectURL(blob));
    });
  });
};
MapsGPX.resolveAsDataURL = function(src) {
  return MapsGPX.resolveAsBlob(src).then(function(blob) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function(event) {
        resolve(event.target.result);
      };
      reader.readAsDataURL(blob);
    });
  });
};
MapsGPX.resolveAsText = function(src, encoding) {
  return MapsGPX.resolveAsBlob(src).then(function(blob) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function(event) {
        resolve(event.target.result);
      };
      reader.readAsText(blob, encoding || 'UTF-8');
    });
  });
};
// util to convert gpx document to json
MapsGPX.GPXToJSON = function( xml_document ) {
  var i, l, j, m, gpx, bounds, 
  linkTypeToJson = function(/*dom node <link>*/node) {
    var obj = { href: node.getAttribute('href') },
        nc = node.childNodes, i, l;
    for ( i = 0, l = nc.length; i < l; ++i ) {
      if ( nc[i].firstChild ) {
        obj[nc[i].tagName] = nc[i].firstChild.nodeValue;
      }
    }
    return obj;
  },
  wptTypeToJson = function(/*dom node <wpt>*/node) {
    var obj = {
      lat: node.getAttribute('lat'),
      lon: node.getAttribute('lon'),
      link: []
      },
      nc = node.childNodes, i, l, tag;
    for ( i = 0, l = nc.length; i < l; ++i ) {
      tag = nc[i].tagName;
      if ( tag == MapsGPX.ELEMENTS.LINK ) {
        obj[MapsGPX.ELEMENTS.LINK].push( linkTypeToJson(nc[i]) );
      } else if ( tag != MapsGPX.ELEMENTS.EXTENSIONS ) {
        if ( nc[i].firstChild ) {
          obj[nc[i].tagName] = nc[i].firstChild.nodeValue;
        }
      }
    }
    return obj;
  },
  rteTypeToJson = function(/*dom node <rte>*/node) {
    var obj = { rtept: [] },
        nc = node.childNodes, i, l, tag;
    for ( i = 0, l = nc.length; i < l; ++i ){
      tag = nc[i].tagName;
      if ( tag == MapsGPX.ELEMENTS.RTEPT ) {
        obj[MapsGPX.ELEMENTS.RTEPT].push( wptTypeToJson(nc[i]) );
      } else if ( tag != MapsGPX.ELEMENTS.EXTENSIONS ) {
        if ( nc[i].firstChild ){
          obj[tag] = nc[i].firstChild.nodeValue;
        }
      }
    }
    return obj;
  },
  trksegTypeToJson = function(/*dom node <trkseg>*/node) {
    var obj = { trkpt: [] },
        nc = node.childNodes, i, l, tag;
    for ( i = 0, l = nc.length; i < l; ++i ) {
      tag = nc[i].tagName;
      if ( tag == MapsGPX.ELEMENTS.TRKPT ) {
        obj[MapsGPX.ELEMENTS.TRKPT].push( wptTypeToJson(nc[i]) );
      } else if ( tag != MapsGPX.ELEMENTS.EXTENSIONS ) {
        if ( nc[i].firstChild ) {
          obj[tag] = nc[i].firstChild.nodeValue;
        }
      }
    }
    return obj;
  },
  trkTypeToJson = function(/*dom node <trk>*/node) {
    var obj = { trkseg: [] },
        nc = node.childNodes, i, l, tag;
    for ( i = 0, l = nc.length; i < l; ++i ) {
      tag = nc[i].tagName;
      if ( tag == MapsGPX.ELEMENTS.TRKSEG ) {
        obj[MapsGPX.ELEMENTS.TRKSEG].push( trksegTypeToJson(nc[i]) );
      } else if ( tag != MapsGPX.ELEMENTS.EXTENSIONS ) {
        if ( nc[i].firstChild ) {
          obj[tag] = nc[i].firstChild.nodeValue;
        }
      }
    }
    return obj;
  },
  gpxTypeToJson = function(/*dom node <gpx>*/node) {
    var obj = {
      metadata: {},
      wpt: [],
      rte: [],
      trk: []
      },
      nc, i, l, tag;
    if ( MapsGPX.strict ) {
      obj['version'] = node.getAttribute('version');
      obj['creator'] = node.getAttribute('creator');
      if ( obj.version != '1.1' ) {
        throw( new Error('GPX document is formatted as unsupported version, it requires 1.1 only.') );
      }
      if ( ! obj.creator ) {
        throw( new Error('Element "gpx" does not have attribute "creator" that is required.') );
      }
    }
    nc = node.childNodes;
    for ( i = 0, l = nc.length; i < l; ++i ) {
      tag = nc[i].tagName;
      if ( tag == MapsGPX.ELEMENTS.WPT ) {
        obj[MapsGPX.ELEMENTS.WPT].push( wptTypeToJson(nc[i]) );
      } else if ( tag == MapsGPX.ELEMENTS.RTE ) {
        obj[MapsGPX.ELEMENTS.RTE].push( rteTypeToJson(nc[i]) );
      } else if ( tag == MapsGPX.ELEMENTS.TRK ) {
        obj[MapsGPX.ELEMENTS.TRK].push( trkTypeToJson(nc[i]) );
      } else if ( tag != MapsGPX.ELEMENTS.EXTENSIONS && tag != MapsGPX.ELEMENTS.METADATA ) {
        if ( nc[i].firstChild ) {
          obj[tag] = nc[i].firstChild.nodeValue;
        }
      }
    }
    return obj;
  };

  gpx = gpxTypeToJson( xml_document.getElementsByTagName(MapsGPX.ELEMENTS.GPX)[0] );
  bounds = MapsGPX.boundsOf(gpx.wpt, bounds);
  for ( i = 0, l = gpx.rte.length; i < l; ++i ) {
    bounds = MapsGPX.boundsOf(gpx.rte[i].rtept, bounds);
  }
  for ( i = 0, l = gpx.trk.length; i < l; ++i ) {
    for ( j = 0, m = gpx.trk[i].trkseg.length; j < m; ++j ) {
      bounds = MapsGPX.boundsOf(gpx.trk[i].trkseg[j].trkpt, bounds);
    }
  }
  gpx.metadata[MapsGPX.ELEMENTS.BOUNDS] = bounds;
  return gpx;
};
// make bounds
MapsGPX.boundsOf = function(pts, bounds) {
  var i, l;
  bounds = bounds || {
    minlat:  90.0,
    maxlat: -90.0,
    minlon: 180.0,
    maxlon:-180.0
    };
  for ( i = 0, l = pts.length; i < l; ++i ) {
    if ( pts[i].lat < bounds.minlat ) {
      bounds.minlat = pts[i].lat;
    }
    if ( bounds.maxlat < pts[i].lat ) {
      bounds.maxlat = pts[i].lat;
    }
    if ( pts[i].lon < bounds.minlon ) {
      bounds.minlon = pts[i].lon;
    }
    if ( bounds.maxlon < pts[i].lon ) {
      bounds.maxlon = pts[i].lon;
    }
  }
  return bounds;
};
//--------------------------------------
// class MapsGPX.LatLngBounds
//   inherited google.maps.LatLngBounds
//
MapsGPX.LatLngBounds = function(sw, ne) {
  this.super      = google.maps.LatLngBounds.prototype;
  this.object_id  = 'MapsGPX.LatLngBounds#'+ MapsGPX.LatLngBounds.nextval();
  google.maps.LatLngBounds.apply(this, arguments);
};
MapsGPX.LatLngBounds._sequence = 0;
MapsGPX.LatLngBounds.nextval = function() {
  return ++MapsGPX.LatLngBounds._sequence;
};
  MapsGPX.LatLngBounds.prototype = Object.create(google.maps.LatLngBounds.prototype, {
    constructor: { value: MapsGPX.LatLngBounds }
  });
  MapsGPX.LatLngBounds.prototype.clone = function() {
    return new MapsGPX.LatLngBounds(this.getSouthWest(), this.getNorthEast());
  };
//--------------------------------------
// class MapsGPX.Marker
//   inherited google.maps.Marker
//
MapsGPX.Marker = function(element_name, src, opts) {
  var wpt_type = src,
      options = opts || {};

  this.super      = google.maps.Marker.prototype;
  this._element   = element_name;
  this._source    = src;
  this._overlayed = null;
  this.object_id  = 'MapsGPX.Marker#'+ MapsGPX.Marker.nextval();

  options.position = new google.maps.LatLng(wpt_type.lat, wpt_type.lon);

  google.maps.Marker.apply(this, [options]);
};
MapsGPX.Marker._sequence = 0;
MapsGPX.Marker.nextval = function() {
  return ++MapsGPX.Marker._sequence;
};
  MapsGPX.Marker.prototype = Object.create(google.maps.Marker.prototype, {
    constructor: { value: MapsGPX.Marker }
  });
  MapsGPX.Marker.prototype.overlayed = function() {
    return this._overlayed;
  };
  MapsGPX.Marker.prototype.isWpt = function() {
    return this._element == MapsGPX.ELEMENTS.WPT ? true : false
  };
  MapsGPX.Marker.prototype.isRte = function() {
    return this._element == MapsGPX.ELEMENTS.RTE ? true : false
  };
  MapsGPX.Marker.prototype.isTrk = function() {
    return this._element == MapsGPX.ELEMENTS.TRK ? true : false
  };
  MapsGPX.Marker.prototype.getSource = function() {
    return this._source;
  };
  MapsGPX.Marker.prototype.setMap = function(g_map) { // override
    this._overlayed = g_map ? true : false;
    this.super.setMap.call(this, g_map);
  };
//--------------------------------------
// class MapsGPX.Polyline
//   inherited google.maps.Polyline
//
MapsGPX.Polyline = function(element_name, src, opts) {
  var pts = src,
      options = opts || {},
      i, j, m;

  this.super      = google.maps.Polyline.prototype;
  this._element   = element_name;
  this._source    = src;
  this._overlayed = null;
  this.object_id  = 'MapsGPX.Polyline#'+ MapsGPX.Polyline.nextval();

  options.path = new google.maps.MVCArray();
  i = 0;
  for ( j = 0, m = pts.length; j < m; ++j ) {
    options.path.insertAt(i++, new google.maps.LatLng(pts[j].lat, pts[j].lon));
  }

  google.maps.Polyline.apply(this, [options]);
};
MapsGPX.Polyline._sequence = 0;
MapsGPX.Polyline.nextval = function() {
  return ++MapsGPX.Polyline._sequence;
};
  MapsGPX.Polyline.prototype = Object.create(google.maps.Polyline.prototype, {
    constructor: { value: MapsGPX.Polyline }
  });
  MapsGPX.Polyline.prototype.overlayed = function() {
    return this._overlayed;
  };
  MapsGPX.Polyline.prototype.isWpt = function() {
    return this._element == MapsGPX.ELEMENTS.WPT ? true : false
  };
  MapsGPX.Polyline.prototype.isRte = function() {
    return this._element == MapsGPX.ELEMENTS.RTE ? true : false
  };
  MapsGPX.Polyline.prototype.isTrk = function() {
    return this._element == MapsGPX.ELEMENTS.TRK ? true : false
  };
  MapsGPX.Polyline.prototype.getSource = function() {
    return this._source;
  };
  MapsGPX.Polyline.prototype.setMap = function(g_map) { // override
    this._overlayed = g_map ? true : false;
    this.super.setMap.call(this, g_map);
  };
  MapsGPX.Polyline.prototype.computeDistanceLinear = function(origin, destination) {
    var src = this.getSource();
    return google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(src[parseInt(origin)].lat, src[parseInt(origin)].lon),
      new google.maps.LatLng(src[parseInt(destination)].lat, src[parseInt(destination)].lon)
      );
  };
  MapsGPX.Polyline.prototype.computeDistanceTrack = function(origin, destination) {
    var src = this.getSource(),
        sum = 0.0, i, l, s;
    origin = parseInt(origin);
    destination = parseInt(destination);
    if ( origin <= destination ) {
      for ( i = origin, l = destination; i < l; ++i ) {
        s = google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(src[i].lat, src[i].lon),
              new google.maps.LatLng(src[i + 1].lat, src[i + 1].lon)
              );
        sum = parseFloat(sum) + parseFloat(s);
      }
    } else {
      for ( i = origin, l = destination; l < i; --i ) {
        s = google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(src[i].lat, src[i].lon),
              new google.maps.LatLng(src[i - 1].lat, src[i - 1].lon)
              );
        sum = parseFloat(sum) - parseFloat(s);
      }
    }
    return sum;
  };
// factories to create extended maps objects
MapsGPX.createLatlngbounds = function(bounds) {
  return new MapsGPX.LatLngBounds(
    new google.maps.LatLng(bounds.minlat, bounds.minlon),
    new google.maps.LatLng(bounds.maxlat, bounds.maxlon)
    );
};
MapsGPX.createOverlayAsWpt = function(src, options) {
  if ( src instanceof Array ) {
    throw( new Error('overlay for wpt is not created from Array') );
  } else {
    return new MapsGPX.Marker(MapsGPX.ELEMENTS.WPT, src, options);
  }
};
MapsGPX.createOverlayAsRte = function(src, options) {
  if ( src instanceof Array ) {
    return new MapsGPX.Polyline(MapsGPX.ELEMENTS.RTE, src, options);
  } else {
    return new MapsGPX.Marker(MapsGPX.ELEMENTS.RTE, src, options);
  }
};
MapsGPX.createOverlayAsTrk = function(src, options) {
  if ( src instanceof Array ) {
    return new MapsGPX.Polyline(MapsGPX.ELEMENTS.TRK, src, options);
  } else {
    return new MapsGPX.Marker(MapsGPX.ELEMENTS.TRK, src, options);
  }
};
//--------------------------------------
// interface MapsGPX.InputHandler
//
MapsGPX.InputHandler = function() {
  this.initialize.apply(this, arguments);
};
MapsGPX.InputHandler.prototype.initialize = function(type, handler) {
  this.type = type;
  this.handler = handler;
};
MapsGPX.InputHandler.prototype.setType = function(type) {
  this.type = type;
  return this;
};
MapsGPX.InputHandler.prototype.getType = function() {
  return this.type;
};
MapsGPX.InputHandler.prototype.setHandler = function(handler) {
  this.handler = handler;
  return this;
};
MapsGPX.InputHandler.prototype.getHandler = function() {
  return this.handler;
};
MapsGPX.InputHandler.defaultHandler = function(key, src) {
  return Promise.resolve(function(obj){ return key });
};
MapsGPX.InputHandler.prototype.execute = function(bind, key, src) {
  return (this.getHandler() || MapsGPX.InputHandler.defaultHandler).call(bind, key, src);
};
// default input handler for application/gpx
MapsGPX.defaultInputHandlerApplicationGPX = function(key, src) {
  return MapsGPX.resolveAsText(src)
    .then((function(gpx_text) { // resolveAsText makes gpx_text from src
      this.addGPX(key, gpx_text);
      return key;
    }).bind(this));
};
//--------------------------------------
// class MapsGPX.MapControl
//
MapsGPX.MapControl = function() {
  this.initialize.apply(this, arguments);
};
MapsGPX.MapControl.prototype = {
  initialize: function(icons, options) {
    var defaults = {
      map: null,
      initial: Object.keys(icons)[0],
      iconWidth: '28',
      iconHeight: '28',
      className: 'map_control_button',
      position: 'RIGHT_BOTTOM'
      }, attr;
    this.icons = icons; // {key1: src1, key2: src2, ...}
    this.settings = {};
    for ( attr in defaults ) { this.settings[attr] = defaults[attr] }
    for ( attr in options || {} ) { this.settings[attr] = options[attr] }

    this.map          = this.settings['map'];
    this.current_key  = this.settings['initial'];
    this.$element     = this._createElement();
    if ( this.map ) {
      this.setMap(this.map);
    }
  },
  getElement: function() {
    return this.$element;
  },
  isCurrentIcon: function(key) {
    return this.current_key == key;
  },
  _getIconByKey: function(key) {
    return this.icons[key];
  },
  _getCurrentIcon: function() {
    return this._getIconByKey(this.current_key);
  },
  _getIconElement: function() {
    return this.$element.getElementsByTagName('img').item(0);
  },
  _createElement: function() {
    var ic, div, vendor, anchor;

    ic = document.createElement('img');
    ic.setAttribute('src', this._getCurrentIcon());
    ic.setAttribute('width', this.settings['iconWidth']);
    ic.setAttribute('height', this.settings['iconHeight']);

    div = document.createElement('div');
    div.setAttribute('class', this.settings['className']);
    div.style.background = '#fff';
    if ( this.settings['position'] == 'TOP_LEFT') {
      div.style.marginTop = '16px';
      div.style.marginLeft = '4px';
    } else if (this.settings['position'] == 'RIGHT_BOTTOM') {
      div.style.marginBottom = '8px';
      div.style.marginRight = '8px';
    } else {
      div.style.margin = '8px';
    }
    div.style.border = '1px solid transparent';
    div.style.borderRadius = '2px';
    div.style.outline = 'none';
    div.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
    vendor = ['webkitB', 'mozB', 'oB', 'msB', 'b'];
    for ( var prefix in vendor ) {
      div.style[vendor[prefix] +'oxSizing'] = 'border-box';
    }

    // for effect instead of hover:cursor
    anchor = document.createElement('a');
    anchor.setAttribute('href', 'javascript:void(0)');
    anchor.style.display = 'block';

    div.appendChild(ic);
    anchor.appendChild(div);
    return anchor;
  },
  getMap: function() {
    return this.map;
  },
  setMap: function(map) {
    this.map = map;
    this.getMap()
    .controls[google.maps.ControlPosition[this.settings['position']]]
    .push(this.$element);
  },
  changeIcon: function(key) {
    this._getIconElement().src = this._getIconByKey(key);
    this.current_key = key;
    return this;
  }
};
//--------------------------------------
// instance methods
//
MapsGPX.prototype.initialize = function(map_id, map_options, options) {
  var attr;
  this.map          = null;
  this.map_id       = map_id;
  this.map_options  = map_options || {};
  this.map_element  = document.getElementById(this.map_id);
  if ( ! this.map_element ) {
    throw( new Error('Could not get element by #'+ map_id) );
  }
  this.object_id    = 'MapsGPX#'+ MapsGPX.nextval();

  this.map_settings = {};
  this.map_defaults = {
    zoom: 12,
    keyboardShortcuts: false,
    center: new google.maps.LatLng(50.08804, 14.42076),
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  for (attr in this.map_defaults) { this.map_settings[attr] = this.map_defaults[attr] }
  for (attr in this.map_options ) { this.map_settings[attr] = this.map_options[attr]  }

  // stash for gpx objects
  this.data = {};

  // stash for each extensions
  this.context = {};

  // stash for hooks
  this.hook = {
    onShowMarker: [],
    onShowPolyline: [],
    onHideMarker: [],
    onHidePolyline: [],
    onCreateLatlngbounds: [],
    onCreateMarker: [],
    onCreatePolyline: [],
    onAddGPX: []
  };

  // stash for filters
  this.filters = {
    onAppearOverlayShow: [],
    onAppearOverlayHide: []
  };

  // stash for input handlers by media types
  this.input_handler = {};

  // stack for load plugins all at once
  this.extentions = [];

  // reset all
  this._afterInitialize();
};
MapsGPX.prototype._afterInitialize = function() {
  // create universe
  this.map = new google.maps.Map(this.map_element, this.map_settings);

  // register default input handler for 'application/gpx'
  this.registerInputHandler(
    new MapsGPX.InputHandler('application/gpx', MapsGPX.defaultInputHandlerApplicationGPX));

  // apply default plugins
  this.use('SetTitleOnCreateMarker');
  this.use('SetStrokeOptionOnCreatePolyline');
};
MapsGPX.prototype.getMap = function() {
  return this.map;
};
MapsGPX.prototype.getMapElement = function() {
  return this.map_element;
};
MapsGPX.prototype.getMapSettings = function() {
  return this.map_settings;
};
MapsGPX.prototype._bounds_of = function() {
  var keys = [], bnd, i, l;
  if ( 0 < arguments.length ) {
    keys = Array.prototype.slice.call(arguments);
  } else {
    keys = this.getKeysOfGPX();
  }
  if ( 0 < keys.length ) {
    bnd = this.getGPX(keys[0]).metadata.latlngbounds.clone();
    for ( i = 1, l = keys.length; i < l; ++i ) {
      bnd.union( this.getGPX(keys[i]).metadata.latlngbounds );
    }
    return bnd;
  }
  return null;
}
MapsGPX.prototype.fitBounds = function() {
  var bnd = this._bounds_of.apply(this, arguments);
  if( bnd ){
    this.getMap().fitBounds(bnd);
  }
  return this;
};
MapsGPX.prototype.panToBounds = function() {
  var bnd = this._bounds_of.apply(this, arguments);
  if( bnd ){
    this.getMap().panToBounds(bnd);
  }
  return this;
};
MapsGPX.prototype._applyAppearOverlay = function(overlay, to_show, key) {
  var show_and_apply_hook, hide_and_apply_hook;
  show_and_apply_hook = function(overlay, key) {
    overlay.setMap(this.getMap());
    if ( overlay.constructor === MapsGPX.Marker ) {
      this.applyHook('onShowMarker', overlay, key);
    } else if ( overlay.constructor === MapsGPX.Polyline ) {
      this.applyHook('onShowPolyline', overlay, key);
    }
  };
  hide_and_apply_hook = function(overlay, key) {
    overlay.setMap(null);
    if ( overlay.constructor === MapsGPX.Marker ) {
      this.applyHook('onShowMarker', overlay, key);
    } else if ( overlay.constructor === MapsGPX.Polyline ) {
      this.applyHook('onShowPolyline', overlay, key);
    }
  };
  if ( to_show ) {
    if ( this.isFilterEffective('onAppearOverlayShow', overlay, key) ) {
      hide_and_apply_hook.call(this, overlay, key);
    } else {
      show_and_apply_hook.call(this, overlay, key);
    }
  } else {
    if ( this.isFilterEffective('onAppearOverlayHide', overlay, key) ) {
      show_and_apply_hook.call(this, overlay, key);
    } else {
      hide_and_apply_hook.call(this, overlay, key);
    }
  }
};
MapsGPX.prototype._appearOverlay = function(to_show, elem, keys) {
  var i, il = keys.length, j, jl, k, kl, m, ml, elements;
  if ( il < 1 ) {
    keys = this.getKeysOfGPX();
    il = keys.length;
  }
  for ( i = 0; i < il; ++i ) {
    elements = this.data[keys[i]][elem];
    for ( j = 0, jl = elements.length; j < jl; ++j ) {
      if ( elements[j].overlay ){
        this._applyAppearOverlay(elements[j].overlay, to_show, keys[i]);
      }
      for ( k in elements[j] ) {
        if ( elements[j][k] instanceof Array ) {
          for ( m = 0, ml = elements[j][k].length; m < ml; ++m ) {
            if ( elements[j][k][m].overlay ) {
              this._applyAppearOverlay(elements[j][k][m].overlay, to_show, keys[i]);
            }
          }
        }
      }
    }
  }
  return this;
};
MapsGPX.prototype.showOverlayWpts = function() {
  return this._appearOverlay.call(this,  true, MapsGPX.ELEMENTS.WPT, arguments);
};
MapsGPX.prototype.hideOverlayWpts = function() {
  return this._appearOverlay.call(this, false, MapsGPX.ELEMENTS.WPT, arguments);
};
MapsGPX.prototype.showOverlayRtes = function() {
  return this._appearOverlay.call(this,  true, MapsGPX.ELEMENTS.RTE, arguments);
};
MapsGPX.prototype.hideOverlayRtes = function() {
  return this._appearOverlay.call(this, false, MapsGPX.ELEMENTS.RTE, arguments);
};
MapsGPX.prototype.showOverlayTrks = function() {
  return this._appearOverlay.call(this,  true, MapsGPX.ELEMENTS.TRK, arguments);
};
MapsGPX.prototype.hideOverlayTrks = function() {
  return this._appearOverlay.call(this, false, MapsGPX.ELEMENTS.TRK, arguments);
};
MapsGPX.prototype.showOverlayGpxs = function() {
  this.showOverlayWpts.apply(this, arguments);
  this.showOverlayRtes.apply(this, arguments);
  this.showOverlayTrks.apply(this, arguments);
};
MapsGPX.prototype.hideOverlayGpxs = function() {
  this.hideOverlayWpts.apply(this, arguments);
  this.hideOverlayRtes.apply(this, arguments);
  this.hideOverlayTrks.apply(this, arguments);
};
MapsGPX._guessType = function(src) {
  if ( typeof src == 'string' ) {
    // src may be URL string
    if ( new RegExp('\.jpe?g$', 'i').test(src) ) {
      return 'image/jpeg';
    }
  } else if ( src instanceof Blob ) {
    if ( src.type == 'image/jpeg' ) {
      return 'image/jpeg';
    }
  }
  return 'application/gpx';
};
MapsGPX.prototype.registerInputHandler = function(input_handler) {
  if ( input_handler instanceof MapsGPX.InputHandler ) {
    this.input_handler[input_handler.type] = input_handler;
  }else{
    throw( new Error('invalid argument, it requires instance of MapsGPX.InputHandler') );
  }
  return this;
};
MapsGPX.prototype._getInputHandlerByType = function(type) {
  var handler = this.input_handler[type];
  if ( handler ) {
    return handler;
  }
  return null;
};
MapsGPX.prototype.input = function(key, src, type) {
  var handler;
  type = type || MapsGPX._guessType(src);
  handler = this._getInputHandlerByType(type);
  if ( handler ) {
    return handler.execute(this, key, src);
  } else {
    console.log('There is no handler for type=['+ type +']');
    return new MapsGPX.InputHandler().execute(this, key, src);
  }
};
MapsGPX.prototype.getGPX = function(key) {
  return this.data[key];
};
MapsGPX.prototype.eachGPX = function(callback) {
  var i;
  for ( i in this.data ) {
    callback(this.data[i], i);
  }
  return this;
};
MapsGPX.prototype.getKeysOfGPX = function() {
  return Object.keys(this.data);
};
MapsGPX.prototype.addGPX = function(key, gpx_text) {
  this.removeGPX(key);
  try {
    this.data[key] = this._build(gpx_text);
    this.applyHook('onAddGPX', key, gpx_text);
  } catch(e) {
    throw( new Error('Catch an exception at addGPX with '+ key +', reason: '+ e) );
  }
  return this;
};
MapsGPX.prototype.removeGPX = function(key) {
  if ( this.data[key] ) {
    this.hideOverlayWpts(key);
    this.hideOverlayRtes(key);
    this.hideOverlayTrks(key);
  }
  this.data[key] = null;
  delete this.data[key];
  return this;
};
MapsGPX.prototype._build = function(gpx_text) {
  var gpx = MapsGPX.GPXToJSON( MapsGPX.parseXML(gpx_text) ),
      i, j, k, l, m, pts;

  // extend gpx.metadata
  gpx.metadata.latlngbounds = MapsGPX.createLatlngbounds(gpx.metadata.bounds);
  this.applyHook('onCreateLatlngbounds', gpx.metadata.latlngbounds);

  // extend gpx.wpt(s)
  for ( i = 0, l = gpx.wpt.length; i < l; ++i ) {
    gpx.wpt[i].overlay = MapsGPX.createOverlayAsWpt(gpx.wpt[i]);
    this.applyHook('onCreateMarker', gpx.wpt[i].overlay);
  }
  // extend gpx.rte(s)
  for ( i = 0, l = gpx.rte.length; i < l; ++i ) {
    gpx.rte[i].overlay = MapsGPX.createOverlayAsRte(gpx.rte[i].rtept);
    this.applyHook('onCreatePolyline', gpx.rte[i].overlay);
    for ( j = 0, m = gpx.rte[i].rtept.length; j < m; ++j ){
      gpx.rte[i].rtept[j].overlay = MapsGPX.createOverlayAsRte(gpx.rte[i].rtept[j]);
      this.applyHook('onCreateMarker', gpx.rte[i].rtept[j].overlay);
    }
  }
  // extend gpx.trk(s)
  if( MapsGPX.join_trkseg ){
    for ( i = 0, l = gpx.trk.length; i < l; ++i ) {
      pts = [];
      for ( j = 0, m = gpx.trk[i].trkseg.length; j < m; ++j ) {
        pts = pts.concat(gpx.trk[i].trkseg[j].trkpt);
      }
      gpx.trk[i].overlay = MapsGPX.createOverlayAsTrk(pts);
      this.applyHook('onCreatePolyline', gpx.trk[i].overlay);
    }
  }else{
    for ( i = 0, l = gpx.trk.length; i < l; ++i ) {
      for ( j = 0, m = gpx.trk[i].trkseg.length; j < m; ++j ) {
        gpx.trk[i].trkseg[j].overlay = MapsGPX.createOverlayAsTrk(gpx.trk[i].trkseg[j].trkpt);
        this.applyHook('onCreatePolyline', gpx.trk[i].trkseg[j].overlay);
      }
    }
  }

  return gpx;
};
MapsGPX.prototype.use = function(plugin_name, params) {
  // When the path was already set, it does not overwrite one
  // bacause the setting at here is less reliable.
  if ( ! MapsGPX.plugin[plugin_name].path ) {
    MapsGPX.plugin[plugin_name].path = [MapsGPX.plugin_dir, plugin_name].join('/');
  }
  try {
    MapsGPX.plugin[plugin_name].callback.bind(this)(params);
  } catch(ex) {
    console.error('Catch an exception on use "'+ plugin_name + '": '+ ex);
    console.trace();
    // don't throw
  }
  return this;
};
MapsGPX.prototype.extend = function(plugin_name, params) {
  this.extentions.push({ plugin_name: plugin_name, params: params || {} });
  return this;
};
MapsGPX.prototype.extended = function(callback) {
  var plugin_names = [], i, l;
  for ( i = 0, l = this.extentions.length; i < l; ++i ) {
    plugin_names.push(this.extentions[i]['plugin_name']);
  }
  MapsGPX.require_plugins.apply(this, plugin_names).then((function() {
    var i, l;
    for ( i = 0, l = this.extentions.length; i < l; ++i ) {
      this.use(this.extentions[i]['plugin_name'], this.extentions[i]['params']);
    }
    this.extentions = [];
  }).bind(this)).then(callback.bind(this));
  return this;
};
MapsGPX.prototype.register = function(hook, callback) {
  try {
    this._registerHook(hook, callback);
  } catch(ex) {
    console.log('Catch an exception on register('+ hook +')');
    console.trace();
    throw(ex);
  }
  return this;
};
MapsGPX.prototype._registerHook = function(hook, callback) {
  if ( hook ) {
    this.hook[hook].push(callback.bind(this));
  } else {
    callback.bind(this)();
  }
};
MapsGPX.prototype.applyHook = function() {
  var name = arguments[0],
      args = Array.prototype.slice.call(arguments, 1),
      i, l;
  for ( i = 0, l = this.hook[name].length; i < l; ++i ) {
    try {
      this.hook[name][i].apply(this, args);
    } catch(ex) {
      console.log('Catch an exception on applyHook "'+ name +'" with args ['+ args +']');
      console.trace();
      throw(ex);
    }
  }
  return this;
};

MapsGPX.prototype.addFilter = function(from, where, callback) {
  this.filters[where][from] = callback;
  return this;
};
MapsGPX.prototype.removeFilter = function(from, where) {
  delete this.filters[where][from];
  return this;
};
MapsGPX.prototype.isFilterEffective = function() {
  var from, effective, any = null,
      args = Array.prototype.slice.call(arguments),
      where = args.shift();
  for ( from in this.filters[where] ) {
    effective = false;
    try {
      if ( typeof this.filters[where][from] == 'function' ) {
        effective = this.filters[where][from].apply(this, args);
      } else {
        effective = this.filters[where][from] ? true : false;
      }
    } catch(ex) {
      console.log('Catch an exception on isFilterEffective("'+ where +'") on "'+ from +'": '+ ex );
    }
    if ( effective ) {
      any = true;
      break;
    }
  }
  return any;
};

//
// plugin mechanism
//
MapsGPX.plugin = {};
// define default plugins
MapsGPX.plugin.SetTitleOnCreateMarker = {
  callback: function(params) {
    this.register('onCreateMarker', (function(marker) {
      marker.setTitle(marker.getSource().name);
    }).bind(this));
  }
};
MapsGPX.plugin.SetStrokeOptionOnCreatePolyline = {
  callback: function(params) {
    this.register('onCreatePolyline', (function(polyline) {
      if ( polyline.isRte() ) {
        polyline.setOptions({
          strokeColor: '#00FF66',
          strokeOpacity: 0.75,
          strokeWeight: 2
        });
      } else if ( polyline.isTrk() ) {
        polyline.setOptions({
          strokeColor: '#0066FF',
          strokeOpacity: 0.5,
          strokeWeight: 4
        });
      }
    }).bind(this));
  }
};
MapsGPX.load_script = function(src) {
  // TODO: check whether it's read already.
  return new Promise(function(resolve, reject) {
    var $script = document.createElement('script');
    $script.onload = function() {
      resolve();
    };
    $script.src = src;
    document.head.appendChild($script);
  });
};
MapsGPX.load_css = function(src) {
  return new Promise(function(resolve, reject) {
    var link = document.createElement('link');
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', src);
    link.onload = function() {
      resolve();
    };
    document.head.appendChild(link);
  });
};
MapsGPX.require_plugin = function(plugin_name) {
  var src,
      t = new Date().getTime(),
      base = [MapsGPX.plugin_dir, plugin_name].join('/'),
      stash = {plugin_name: plugin_name, base: base, t: t};
  if ( MapsGPX.cache_script ) {
    src = [base, MapsGPX.scrip_loader].join('/');
  } else {
    src = [base, MapsGPX.scrip_loader +'?t='+ t].join('/');
  }
  return MapsGPX.load_script(src).then((function() {
    var load_scripts = [], bundles, bundle, i, l;
    MapsGPX.plugin[this.plugin_name].path = this.base;
    bundles = MapsGPX.plugin[this.plugin_name].bundles || [];
    for ( i = 0, l = bundles.length; i < l; ++i ) {
      if ( bundles[i].match(/\//) ) {
        bundle = bundles[i];
      } else {
        if ( MapsGPX.cache_script ) {
          bundle = [this.base, bundles[i]].join('/');
        } else {
          bundle = [this.base, bundles[i] +'?t='+ this.t].join('/');
        }
      }
      if ( bundles[i].match(/\.css$/) ) {
        load_scripts.push(MapsGPX.load_css(bundle));
      } else {
        load_scripts.push(MapsGPX.load_script(bundle));
      }
    }
    return Promise.all(load_scripts);
  }).bind(stash));
};
MapsGPX.require_plugins = function() {
  // load each plugins serially
  var plugin_names = Array.prototype.map.call(arguments, function(cur) { return cur }),
      p = Promise.resolve(null), i, l;
  for ( i = 0, l = plugin_names.length; i < l; ++i ) {
      p = p.then((function() {
            return MapsGPX.require_plugin(this.plugin_name);
          }).bind({plugin_name: plugin_names[i]}));
  }
  return p;
};

//
// management of onload
//
MapsGPX._ready = false;
MapsGPX._on_readies = [];
MapsGPX.onReady = function(callback) {
  MapsGPX._on_readies.push(callback);
  if ( MapsGPX._ready ) {
    MapsGPX._emit();
  }
};
MapsGPX._emit = function() {
  var cb;
  while ( true ) {
    cb = MapsGPX._on_readies.shift();
    if ( ! cb ) {
      break;
    }
    cb.call(this);
  }
  return this;
};
(function() {
  google.maps.event.addDomListener(window, 'load', function() {
    MapsGPX._ready = true;
    MapsGPX._emit();
  });
})();
MapsGPX.strict = false;
MapsGPX.onReady(function() {
  new MapsGPX('map_canvas')
    .extend('InputFileControl')
    .extended(function() {
      this.register('onAddGPX', function(key) {
        this.fitBounds();
        this.showOverlayGpxs(key);
      });
    });
});
