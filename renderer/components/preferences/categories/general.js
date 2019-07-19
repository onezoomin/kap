import electron from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import tildify from 'tildify';

import {connect, PreferencesContainer} from '../../../containers';

import Item from '../item';
import Switch from '../item/switch';
import Button from '../item/button';
import Select from '../item/select';
import ShortcutInput from '../shortcut-input';

import Category from './category';

class General extends React.Component {
  static defaultProps = {
    audioDevices: [],
    kapturesDir: '',
    category: 'general'
  }

  state = {}

  componentDidMount() {
    this.setState({
      showCursorSupported: electron.remote.require('./utils/macos-version').isGreaterThanOrEqualTo('10.14')
    });
  }

  openKapturesDir = () => {
    electron.shell.openItem(this.props.kapturesDir);
  }

  render() {
    const {
      kapturesDir,
      openOnStartup,
      allowAnalytics,
      showCursor,
      highlightClicks,
      hideDesktopIcons,
      doNotDisturb,
      record60fps,
      recordKeyboardShortcut,
      loopExports,
      toggleSetting,
      audioInputDeviceId,
      setAudioInputDeviceId,
      audioDevices,
      recordAudio,
      pickKapturesDir,
      setOpenOnStartup,
      cropperShortcut,
      updateShortcut,
      toggleShortcuts,
      category
    } = this.props;

    const {showCursorSupported} = this.state;

    const devices = audioDevices.map(device => ({
      label: device.name,
      value: device.id
    }));

    const kapturesDirPath = tildify(kapturesDir);
    const tabIndex = category === 'general' ? 0 : -1;
    const fpsOptions = [{label: '10 FPS', value: false}, {label: '15 FPS', value: false}, {label: '30 FPS', value: false}, {label: '60 FPS', value: true}];

    return (
      <Category>
        {
          showCursorSupported &&
            <Item
              key="showCursor"
              parentItem
              title="Show cursor"
              subtitle="Display the mouse cursor in your Kaptures"
            >
              <Switch
                tabIndex={tabIndex}
                checked={showCursor}
                onClick={
                  () => {
                    if (showCursor) {
                      toggleSetting('highlightClicks', false);
                    }

                    toggleSetting('showCursor');
                  }
                }/>
            </Item>
        }
        {
          showCursorSupported &&
            <Item key="highlightClicks" subtitle="Highlight clicks">
              <Switch
                tabIndex={tabIndex}
                checked={highlightClicks}
                disabled={!showCursor}
                onClick={() => toggleSetting('highlightClicks')}
              />
            </Item>
        }
        <Item
          key="recordKeyboardShortcut"
          parentItem
          title="Keyboard shortcuts"
          subtitle="Toggle and customise keyboard shortcuts"
        >
          <Switch tabIndex={tabIndex} checked={recordKeyboardShortcut} onClick={toggleShortcuts}/>
        </Item>
        {
          recordKeyboardShortcut &&
            <Item key="cropperShortcut" subtitle="Trigger Kap">
              <ShortcutInput
                shortcut={cropperShortcut}
                tabIndex={tabIndex}
                onChange={shortcut => updateShortcut('cropperShortcut', shortcut)}
              />
            </Item>
        }
        <Item
          key="hideDesktopIcons"
          title="Hide desktop icons"
          subtitle="Temporarily hide desktop icons while recording"
        >
          <Switch tabIndex={tabIndex} checked={hideDesktopIcons} onClick={() => toggleSetting('hideDesktopIcons')}/>
        </Item>
        <Item
          key="doNotDisturb"
          title="Silence notifications"
          subtitle="Activate “Do Not Disturb” while recording"
        >
          <Switch tabIndex={tabIndex} checked={doNotDisturb} onClick={() => toggleSetting('doNotDisturb')}/>
        </Item>
        <Item
          key="loopExports"
          title="Loop exports"
          subtitle="Infinitely loop exports when supported"
        >
          <Switch tabIndex={tabIndex} checked={loopExports} onClick={() => toggleSetting('loopExports')}/>
        </Item>
        <Item
          key="recordAudio"
          parentItem
          title="Audio recording"
          subtitle="Record audio from input device"
        >
          <Switch
            tabIndex={tabIndex}
            checked={recordAudio}
            onClick={() => toggleSetting('recordAudio')}/>
        </Item>
        <Item key="audioInputDeviceId" subtitle="Select input device">
          <Select
            tabIndex={tabIndex}
            options={devices}
            selected={audioInputDeviceId}
            placeholder="Select Device"
            noOptionsMessage="No input devices"
            onSelect={setAudioInputDeviceId}/>
        </Item>
        <Item
          key="capturefps"
          title="Capture frame rate"
          subtitle="Increased FPS impacts performance and file size"
        >
          <Select
            tabIndex={tabIndex}
            options={fpsOptions}
            selected={record60fps}
            onSelect={value => toggleSetting('record60fps', value)}/>
        </Item>
        <Item
          key="playbackfps"
          title="Playback frame rate"
          subtitle="Increased FPS impacts performance and file size"
        >
          <Select
            tabIndex={tabIndex}
            options={fpsOptions}
            selected={record60fps}
            onSelect={value => toggleSetting('record60fps', value)}/>
        </Item>
        <Item
          key="allowAnalytics"
          title="Allow analytics"
          subtitle="Help us improve Kap by sending anonymous usage stats"
        >
          <Switch tabIndex={tabIndex} checked={allowAnalytics} onClick={() => toggleSetting('allowAnalytics')}/>
        </Item>
        <Item
          key="openOnStartup"
          title="Start automatically"
          subtitle="Launch Kap on system startup"
        >
          <Switch tabIndex={tabIndex} checked={openOnStartup} onClick={setOpenOnStartup}/>
        </Item>
        <Item
          key="pickKapturesDir"
          title="Save to…"
          subtitle={kapturesDirPath}
          tooltip={kapturesDir}
          onSubtitleClick={this.openKapturesDir}
        >
          <Button tabIndex={tabIndex} title="Choose" onClick={pickKapturesDir}/>
        </Item>
      </Category>
    );
  }
}

General.propTypes = {
  showCursor: PropTypes.bool,
  highlightClicks: PropTypes.bool,
  hideDesktopIcons: PropTypes.bool,
  doNotDisturb: PropTypes.bool,
  record60fps: PropTypes.bool,
  recordKeyboardShortcut: PropTypes.bool,
  toggleSetting: PropTypes.elementType.isRequired,
  audioInputDeviceId: PropTypes.string,
  setAudioInputDeviceId: PropTypes.elementType.isRequired,
  audioDevices: PropTypes.array,
  recordAudio: PropTypes.bool,
  kapturesDir: PropTypes.string,
  openOnStartup: PropTypes.bool,
  allowAnalytics: PropTypes.bool,
  loopExports: PropTypes.bool,
  pickKapturesDir: PropTypes.elementType.isRequired,
  setOpenOnStartup: PropTypes.elementType.isRequired,
  updateShortcut: PropTypes.elementType.isRequired,
  toggleShortcuts: PropTypes.elementType.isRequired,
  category: PropTypes.string,
  cropperShortcut: PropTypes.shape({
    metaKey: PropTypes.bool.isRequired,
    altKey: PropTypes.bool.isRequired,
    ctrlKey: PropTypes.bool.isRequired,
    shiftKey: PropTypes.bool.isRequired,
    character: PropTypes.string.isRequired
  })
};

export default connect(
  [PreferencesContainer],
  ({
    showCursor,
    highlightClicks,
    hideDesktopIcons,
    doNotDisturb,
    record60fps,
    recordAudio,
    recordKeyboardShortcut,
    audioInputDeviceId,
    audioDevices,
    kapturesDir,
    openOnStartup,
    allowAnalytics,
    loopExports,
    cropperShortcut,
    category
  }) => ({
    showCursor,
    highlightClicks,
    hideDesktopIcons,
    doNotDisturb,
    record60fps,
    recordAudio,
    recordKeyboardShortcut,
    audioInputDeviceId,
    audioDevices,
    kapturesDir,
    openOnStartup,
    allowAnalytics,
    loopExports,
    cropperShortcut,
    category
  }),
  ({
    toggleSetting,
    setAudioInputDeviceId,
    pickKapturesDir,
    setOpenOnStartup,
    updateShortcut,
    toggleShortcuts
  }) => ({
    toggleSetting,
    setAudioInputDeviceId,
    pickKapturesDir,
    setOpenOnStartup,
    updateShortcut,
    toggleShortcuts
  })
)(General);
