const webrtc = require('wrtc');
const client = require('../cache/redis.js');

let senderStream;

module.exports.broadcast = async (req, res) => {
    const { code, sdp } = req.body;
    try {
        const peer = new webrtc.RTCPeerConnection();
        peer.ontrack = (e) => {
            senderStream = e.streams[0];
        }
        const description = new webrtc.RTCSessionDescription(sdp);
        await peer.setRemoteDescription(description);
        const ans = await peer.createAnswer();
        await peer.setLocalDescription(ans);
        res.status(200).json({
            sdp: peer.localDescription
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Server Error!"
        });
    }
};

module.exports.reciever = async (req, res) => {
    const { code, sdp } = req.body;
    try {
        const peer = new webrtc.RTCPeerConnection();
        const description = new webrtc.RTCSessionDescription(sdp);
        await peer.setRemoteDescription(description);
        senderStream.getTracks().forEach(track => peer.addTrack(track, senderStream));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        res.status(200).json({
            sdp: peer.localDescription
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Server Error!"
        });
    }
};