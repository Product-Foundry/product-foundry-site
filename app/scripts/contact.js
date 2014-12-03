var whowearegrid,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

whowearegrid = function(hex) {
  var add, centerGrid, elem, grid, ignoreEvents, offsetX, offsetY, size;
  elem = document.getElementById("who-we-are-grid");
  ignoreEvents = ['mousewheel', 'DOMMouseScroll', 'panstart', 'panmove', 'panend'];
  hex.oldAddEvent = hex.addEvent;
  hex.addEvent = function(elem, type, handler) {
    var _ref;
    if ((_ref = !type, __indexOf.call(ignoreEvents, _ref) >= 0)) {
      return hex.oldAddEvent(elem, type, handler);
    }
  };
  grid = hex.grid(elem, {
    type: "businesscanvas"
  });
  size = hex.size(grid.elem);
  centerGrid = function() {
    size = hex.size(grid.elem);
    return grid.reorient(size.x * 0.5, size.y * 0.5);
  };
  centerGrid();
  window.onresize = function() {
    return centerGrid();
  };
  offsetX = -1;
  offsetY = 1;
  add = function(x, y, type, content) {
    var cell, contentElem, delay, placement, pos, srcElem, titleElem, trigger;
    x = x + offsetX;
    y = y + offsetY;
    pos = grid.screenpos(x, y);
    cell = $('<div>').addClass('cell').addClass(type);
    cell.css('left', pos.x + "px");
    cell.css('top', pos.y + "px");
    cell.attr('rel', type + '-' + content);
    if (type === 'logo') {

    } else {

    }
    if (type === 'location') {
      cell.html(content);
    } else {
      cell.addClass(content);
      srcElem = $('#' + content);
      if (srcElem.length === 1) {
        titleElem = $('.title', srcElem);
        contentElem = $('.content', srcElem);
        trigger = type === 'person' ? 'hover' : 'click';
        delay = trigger === 'hover' ? {
          show: 500,
          hide: 100
        } : {
          show: 0,
          hide: 0
        };
        placement = y < 0 ? 'bottom' : 'top';
        cell.popover({
          placement: placement,
          trigger: trigger,
          title: titleElem.html(),
          content: contentElem.html(),
          delay: delay,
          html: true
        });
      }
    }
    return grid.root.appendChild(cell[0]);
  };
  add(3, -2, "logo", "");
  add(2, -1, "location", "Netherlands");
  add(1, 0, "person", "job");
  add(1, -1, "person", "andre");
  add(0, -1, "person", "hung");
  add(0, 0, "person", "indranil");
  add(3, -3, "location", "Romania");
  add(5, -4, "person", "andreea");
  add(4, -4, "person", "marian");
  add(2, -3, "person", "daniel");
  add(3, -4, "person", "teodora");
  add(5, -5, "person", "marius");
  add(4, -5, "person", "raluca");
  add(4, -2, "location", "Germany");
  add(5, -2, "person", "michael");
  add(3, -1, "location", "India");
  return add(3, 0, "person", "sanjay");
};

$(function() {
  $('#who-we-are-grid').show();
  $('#who-we-are article').hide();
  return whowearegrid(window.hex);
});
