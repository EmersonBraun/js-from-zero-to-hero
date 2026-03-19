# Sound Board

> [pt-br version](README-PTBR.md)

An interactive sound board with categorized audio samples, volume control, and loop functionality.

![Sound Board](gifs/class.gif)

## CLASS

### Features

- **Categorized Sounds**: Nature, instruments, sound effects, and animal sounds
- **Master Volume Control**: Adjust volume for all sounds
- **Category Filtering**: Filter sounds by category
- **Play Controls**: Play, stop all, and random sound selection
- **Loop Mode**: Toggle loop functionality for continuous playback
- **Visual Feedback**: Buttons light up when playing
- **Keyboard Shortcuts**: Space to play/pause, Escape to stop all
- **Responsive Design**: Works on desktop and mobile devices

### How to Use

1. **Select Category**: Choose a sound category from the dropdown
2. **Adjust Volume**: Use the master volume slider
3. **Play Sounds**: Click on any sound button to play
4. **Control Playback**: Use Stop All, Random Sound, and Loop buttons
5. **Keyboard Shortcuts**:
   - `Spacebar`: Play random sound / Stop all
   - `Escape`: Stop all sounds
   - `L`: Toggle loop mode

### Sound Categories

- **Nature**: Rain, thunder, ocean waves, forest birds
- **Instruments**: Piano, guitar, drum beat, violin
- **Sound Effects**: Door bell, phone ring, footsteps, clock tick
- **Animals**: Dog bark, cat meow, horse neigh, cow moo

### Technologies Used

- HTML5
- CSS3 (with animations and visual effects)
- Vanilla JavaScript
- Web Audio API
- Google Fonts (Roboto)

---

## CHALLENGE 01

### Additional Features

- **Custom Sound Upload**: Upload your own audio files
- **Playlist Creation**: Create and save custom playlists
- **Sound Mixing**: Play multiple sounds simultaneously
- **Equalizer**: Basic equalizer controls for each sound
- **Recording**: Record and save new sounds
- **Favorites**: Mark and filter favorite sounds

### Implementation

- Add file upload functionality
- Implement playlist management with local storage
- Create audio mixing with multiple AudioContext instances
- Add basic equalizer controls
- Implement recording using MediaRecorder API
- Add favorites system with local storage

---

## CHALLENGE 02

### Advanced Features

- **Advanced Audio Effects**: Reverb, echo, pitch shift
- **MIDI Support**: Connect MIDI devices for live performance
- **Audio Visualization**: Real-time waveform and spectrum display
- **Social Features**: Share playlists and sounds
- **Cloud Storage**: Save sounds and playlists to the cloud
- **Collaborative Mode**: Multiple users can control the sound board

### Implementation

- Integrate Web Audio API effects (ConvolverNode, DelayNode)
- Add MIDI device support with Web MIDI API
- Create audio visualization using Canvas API
- Implement social sharing and cloud storage
- Add real-time collaboration with WebSockets
- Create advanced UI with drag-and-drop functionality

---

## Navigation

- [Challenge 1](challenge-1/index.html)
- [Challenge 2](challenge-2/index.html)
- [Main Project](index.html)

---

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the MIT License. 