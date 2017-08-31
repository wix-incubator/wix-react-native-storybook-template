'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeCompat = require('react-native-compat');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SectionHeader = function SectionHeader(_ref) {
  var title = _ref.title,
      selected = _ref.selected;
  return _react2.default.createElement(
    _reactNative.View,
    { key: title, style: _style2.default.header },
    _react2.default.createElement(
      _reactNative.Text,
      { style: [_style2.default.headerText, selected && _style2.default.headerTextSelected] },
      title
    )
  );
};

SectionHeader.propTypes = {
  title: _propTypes2.default.string.isRequired,
  selected: _propTypes2.default.bool.isRequired
};

var ListItem = function ListItem(_ref2) {
  var title = _ref2.title,
      selected = _ref2.selected,
      onPress = _ref2.onPress;
  return _react2.default.createElement(
    _reactNative.TouchableOpacity,
    { key: title, style: _style2.default.item, onPress: onPress },
    _react2.default.createElement(
      _reactNative.Text,
      { style: [_style2.default.itemText, selected && _style2.default.itemTextSelected] },
      title
    )
  );
};

ListItem.propTypes = {
  title: _propTypes2.default.string.isRequired,
  onPress: _propTypes2.default.func.isRequired,
  selected: _propTypes2.default.bool.isRequired
};

var StoryListView = function (_Component) {
  (0, _inherits3.default)(StoryListView, _Component);

  function StoryListView(props) {
    var _ref3;

    (0, _classCallCheck3.default)(this, StoryListView);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref3 = StoryListView.__proto__ || (0, _getPrototypeOf2.default)(StoryListView)).call.apply(_ref3, [this, props].concat(args)));

    var ds = new _reactNative.ListView.DataSource({
      rowHasChanged: function rowHasChanged(r1, r2) {
        return r1 !== r2;
      },
      sectionHeaderHasChanged: function sectionHeaderHasChanged(s1, s2) {
        return s1 !== s2;
      }
    });

    _this.state = {
      dataSource: ds.cloneWithRowsAndSections({})
    };

    _this.storyAddedHandler = _this.handleStoryAdded.bind(_this);
    _this.changeStoryHandler = _this.changeStory.bind(_this);

    _this.props.stories.on('storyAdded', _this.storyAddedHandler);
    return _this;
  }

  (0, _createClass3.default)(StoryListView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleStoryAdded();
      var dump = this.props.stories.dumpStoryBook();
      var nonEmptyKind = dump.find(function (kind) {
        return kind.stories.length > 0;
      });
      if (nonEmptyKind) {
        this.changeStory(nonEmptyKind.kind, nonEmptyKind.stories[0]);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.stories.removeListener('storyAdded', this.storyAddedHandler);
    }
  }, {
    key: 'handleStoryAdded',
    value: function handleStoryAdded() {
      if (this.props.stories) {
        var data = this.props.stories.dumpStoryBook();

        var sections = data.reduce(function (map, section) {
          return (0, _extends4.default)({}, map, (0, _defineProperty3.default)({}, section.kind, section.stories.map(function (story) {
            return {
              key: story,
              name: story,
              kind: section.kind
            };
          })));
        }, {});
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(sections)
        });
      }
    }
  }, {
    key: 'changeStory',
    value: function changeStory(kind, story) {
      this.props.events.emit('setCurrentStory', { kind: kind, story: story });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactNativeCompat.MinMaxView,
        { maxWidth: 250 },
        _react2.default.createElement(_reactNative.ListView, {
          style: _style2.default.list,
          renderRow: function renderRow(item) {
            return _react2.default.createElement(ListItem, {
              title: item.name,
              selected: item.kind === _this2.props.selectedKind && item.name === _this2.props.selectedStory,
              onPress: function onPress() {
                return _this2.changeStory(item.kind, item.name);
              }
            });
          },
          renderSectionHeader: function renderSectionHeader(sectionData, sectionName) {
            return _react2.default.createElement(SectionHeader, {
              title: sectionName,
              selected: sectionName === _this2.props.selectedKind
            });
          },
          dataSource: this.state.dataSource,
          stickySectionHeadersEnabled: false
        })
      );
    }
  }]);
  return StoryListView;
}(_react.Component);

exports.default = StoryListView;


StoryListView.propTypes = {
  stories: _propTypes2.default.shape({
    dumpStoryBook: _propTypes2.default.func.isRequired,
    on: _propTypes2.default.func.isRequired,
    emit: _propTypes2.default.func.isRequired,
    removeListener: _propTypes2.default.func.isRequired
  }).isRequired,
  events: _propTypes2.default.shape({
    on: _propTypes2.default.func.isRequired,
    emit: _propTypes2.default.func.isRequired,
    removeListener: _propTypes2.default.func.isRequired
  }).isRequired,
  selectedKind: _propTypes2.default.string,
  selectedStory: _propTypes2.default.string
};

StoryListView.defaultProps = {
  selectedKind: null,
  selectedStory: null
};