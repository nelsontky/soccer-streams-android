import $ from "cheerio";
import url from "url";

import delay from "./delay";
import supportedSites from "./supportedSites";
import { getHtmlFromUrl } from "./get";

const SAMPLE_HTML: string = `
<html><head></head><body><div class="row">
<div class="col-lg">
  <!-- Default Card Example -->
  <div class="card mb-4">
    <div class="card-header" style="text-decoration: underline;">
      <h2>Web</h2>
    </div>
    <div class="card-body" style="background-color: #f8f7fc;">
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="135215">
            ▲
          </div>
          <div class="votes-count">
            3105
          </div>
          <div class="dodownvote" data-stream-id="135215">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>HO</span>
          </div>
        </div>
        <a class="stream-info" href="http://hockeynews.site/events/2020/ww-vs-ars/" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">Hockeynews
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">SKY SPORT MAIN EVENT</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="135215">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="119576">
            ▲
          </div>
          <div class="votes-count">
            7420
          </div>
          <div class="dodownvote" data-stream-id="119576">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>WE</span>
          </div>
        </div>
        <a class="stream-info" href="http://liveonscore.net/soccer-streams/wolverhampton-wanderers-vs-arsenal/" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">Weak_Spell
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">Sky Sports Main Event HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="119576">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="134524">
            ▲
          </div>
          <div class="votes-count">
            1
          </div>
          <div class="dodownvote" data-stream-id="134524">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>DV</span>
          </div>
        </div>
        <a class="stream-info" href="https://myoplay.club/oplive/" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">Dvaix
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">Sky Sports Premier League 1080P FULL HD MultiQuality ( No
                Crowd Sound )</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="134524">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="118648">
            ▲
          </div>
          <div class="votes-count">
            1
          </div>
          <div class="dodownvote" data-stream-id="118648">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>BL</span>
          </div>
        </div>
        <a class="stream-info" href="http://elixx.me/wajax.html" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">bluejetset
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">SKY SPORTS MAIN EVENT</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-520P">520P</span>
            <span class="label label-warning tt-3">3 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="118648">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="118649">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="118649">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>BL</span>
          </div>
        </div>
        <a class="stream-info" href="http://elixx.me/evalencia.html" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">bluejetset
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">NBC SPORT USA</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-520P">520P</span>
            <span class="label label-warning tt-3">3 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="118649">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="127699">
            ▲
          </div>
          <div class="votes-count">
            1
          </div>
          <div class="dodownvote" data-stream-id="127699">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>LA</span>
          </div>
        </div>
        <a class="stream-info" href="https://ladsnbastands.com/adu1-b-somethingright-with/" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">ladstreams
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">SKY SPORTS FEED</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="127699">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="127700">
            ▲
          </div>
          <div class="votes-count">
            1
          </div>
          <div class="dodownvote" data-stream-id="127700">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>LA</span>
          </div>
        </div>
        <a class="stream-info" href="https://ladsnbastands.com/adumain3" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">ladstreams
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">NBCSN FEED</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="127700">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="136254">
            ▲
          </div>
          <div class="votes-count">
            1
          </div>
          <div class="dodownvote" data-stream-id="136254">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>TH</span>
          </div>
        </div>
        <a class="stream-info" href="http://www.blacktiesports.net/soccer1" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">thebaldstreamer
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">Sky Sports HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="136254">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138206">
            ▲
          </div>
          <div class="votes-count">
            2
          </div>
          <div class="dodownvote" data-stream-id="138206">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SP</span>
          </div>
        </div>
        <a class="stream-info" href="http://footballstream.to/frame/ch2.php" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">sportsonme
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">Sky Sports Main Event HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138206">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138210">
            ▲
          </div>
          <div class="votes-count">
            1594
          </div>
          <div class="dodownvote" data-stream-id="138210">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SP</span>
          </div>
        </div>
        <a class="stream-info" href="http://footballstream.to/frame/ch3.php" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">sportsonme
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">NBCSN HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138210">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="139009">
            ▲
          </div>
          <div class="votes-count">
            1
          </div>
          <div class="dodownvote" data-stream-id="139009">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>MN</span>
          </div>
        </div>
        <a class="stream-info" href="http://hdstreams.club/hd/ch5.php" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">mntvlive13
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">Sky Sports Premier League (ABR)</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="139009">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138588">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138588">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>WE</span>
          </div>
        </div>
        <a class="stream-info" href="http://liveonscore.net/soccer-streams/wolverhampton-wanderers-vs-arsenal/?link=2" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">Weak_Spell
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">NBCSN HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138588">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138057">
            ▲
          </div>
          <div class="votes-count">
            6
          </div>
          <div class="dodownvote" data-stream-id="138057">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>GI</span>
          </div>
        </div>
        <a class="stream-info" href="http://givemereddit.stream/soccer/arsenal-live-stream" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">givemeredditstream
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">SKY SPORTS PREMIER LEAGUE HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138057">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="121936">
            ▲
          </div>
          <div class="votes-count">
            2
          </div>
          <div class="dodownvote" data-stream-id="121936">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>YO</span>
          </div>
        </div>
        <a class="stream-info" href="http://60fps.live/wolverhampton-wanderers-vs-arsenal/?link=1&amp;utm_source=footybite" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">youpit
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">NBCS GOLD + SKY SPORTS UK
              </span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="121936">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138703">
            ▲
          </div>
          <div class="votes-count">
            1
          </div>
          <div class="dodownvote" data-stream-id="138703">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>CR</span>
          </div>
        </div>
        <a class="stream-info" href="http://stream-cr7.net/embed/2.php" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">cr7
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">Sky Sports Premier League HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138703">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138978">
            ▲
          </div>
          <div class="votes-count">
            1
          </div>
          <div class="dodownvote" data-stream-id="138978">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>RA</span>
          </div>
        </div>
        <a class="stream-info" href="http://soccer.streamspass.com/live.html?stream=stream_12&amp;title=Wolves+vs+Arsenal+Live+Stream" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">RainoStream
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">Sky Sports Premier League
              </span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-520P">520P</span>
            <span class="label label-warning tt-4">4 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138978">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138856">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138856">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>NB</span>
          </div>
        </div>
        <a class="stream-info" href="http://nbanownews.com/ssoccer3/" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">nbanownews
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">NBCSN US COMMENTARY</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138856">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138803">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138803">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>NB</span>
          </div>
        </div>
        <a class="stream-info" href="http://nbanownews.com/1-soccer/" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">nbanownews
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">SKY SPORT UK COMMENTARY</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138803">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138042">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138042">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>MA</span>
          </div>
        </div>
        <a class="stream-info" href="http://markky88.com/video/wolverhampton-wanderers-vs-arsenal/?sv=2" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">Markky
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">NBCSN HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138042">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138041">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138041">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>MA</span>
          </div>
        </div>
        <a class="stream-info" href="http://markky88.com/video/wolverhampton-wanderers-vs-arsenal/" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">Markky
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">Sky Sports Main Event</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138041">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="121516">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="121516">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>CY</span>
          </div>
        </div>
        <a class="stream-info" href="http://cyclingentertainment.stream/corona/2020/wolverhampton-wanderers-vs-arsenal/" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">CyclingEntertainment
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">SKY SPORTS MAIN EVENTS HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="121516">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="139113">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="139113">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>ED</span>
          </div>
        </div>
        <a class="stream-info" href="http://eddensports.com/event/2020/wolverhampton-wanderers-vs-arsenal/" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">EddenSports
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">Sky Sports Main Event HD (UK)</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="139113">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="136433">
            ▲
          </div>
          <div class="votes-count">
            2
          </div>
          <div class="dodownvote" data-stream-id="136433">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SO</span>
          </div>
        </div>
        <a class="stream-info" href=" https://redsoccer.info/xo_event/preview-three/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">Soccer_Info </span>|
              <span class="stream-link">NBCS</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="136433">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="122052">
            ▲
          </div>
          <div class="votes-count">
            1
          </div>
          <div class="dodownvote" data-stream-id="122052">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>ST</span>
          </div>
        </div>
        <a class="stream-info" href="http://www.streameast.live/soccer/wolverhampton-arsenal" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">streameastlve </span>|
              <span class="stream-link">NBCSN</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="122052">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="127195">
            ▲
          </div>
          <div class="votes-count">
            1
          </div>
          <div class="dodownvote" data-stream-id="127195">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>UN</span>
          </div>
        </div>
        <a class="stream-info" href="https://unitedbacke.xyz/epl-a/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">unitedbacke </span>|
              <span class="stream-link">NBCSN</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="127195">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138747">
            ▲
          </div>
          <div class="votes-count">
            1
          </div>
          <div class="dodownvote" data-stream-id="138747">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>PO</span>
          </div>
        </div>
        <a class="stream-info" href="https://poscitech.com/wolverhampton-wanderers-vs-arsenal-4/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">poscitechstream </span>|
              <span class="stream-link">✔️ Sport TV2 Portugal</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138747">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="118509">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="118509">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>PO</span>
          </div>
        </div>
        <a class="stream-info" href="https://poscitech.com/wolverhampton-wanderers-vs-arsenal/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">poscitechstream </span>|
              <span class="stream-link">✔️ NBCSN </span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="118509">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138652">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138652">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>ZO</span>
          </div>
        </div>
        <a class="stream-info" href="https://freelive365.com/player.php?id=2855&amp;code=4737&amp;evento=%20wolverhampton%20wanderers%20vs%20arsenal" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">ZORROHD </span>|
              <span class="stream-link">Byetv p2p</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138652">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138745">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138745">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>PO</span>
          </div>
        </div>
        <a class="stream-info" href="https://poscitech.com/wolverhampton-wanderers-vs-arsenal-2/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">poscitechstream </span>|
              <span class="stream-link">✔️Sky Sports Main Event</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138745">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138712">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138712">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>IW</span>
          </div>
        </div>
        <a class="stream-info" href="https://iwizwig.com/live-streams/espn-wolves-vs-arsenal/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">Iwizwigsports </span>|
              <span class="stream-link">✔️ ESPN Brasil</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138712">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138711">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138711">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>IW</span>
          </div>
        </div>
        <a class="stream-info" href="https://iwizwig.com/live-streams/wolverhampton-wanderers-vs-arsenal/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">Iwizwigsports </span>|
              <span class="stream-link">✔️ Sky Sports Main Event</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138711">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138688">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138688">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SO</span>
          </div>
        </div>
        <a class="stream-info" href="http://www.soccershows.pw/events-match-5071258.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">soccershows </span>|
              <span class="stream-link">Sky Sports Premier League</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-3">3 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138688">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138650">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138650">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>ZO</span>
          </div>
        </div>
        <a class="stream-info" href="https://freelive365.com/player.php?id=2855&amp;code=4744&amp;evento=%20wolverhampton%20wanderers%20vs%20arsenal" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">ZORROHD </span>|
              <span class="stream-link">Byetv p2p</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138650">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138651">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138651">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>ZO</span>
          </div>
        </div>
        <a class="stream-info" href="https://freelive365.com/player.php?id=2855&amp;code=4748&amp;evento=%20wolverhampton%20wanderers%20vs%20arsenal" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">ZORROHD </span>|
              <span class="stream-link">Byetv p2p</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138651">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138649">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138649">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>ZO</span>
          </div>
        </div>
        <a class="stream-info" href="https://freelive365.com/player.php?id=2855&amp;code=4762&amp;evento=%20wolverhampton%20wanderers%20vs%20arsenal" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">ZORROHD </span>|
              <span class="stream-link">Byetv p2p</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138649">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138599">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138599">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>ST</span>
          </div>
        </div>
        <a class="stream-info" href="https://streamsport.pro/live/ch61.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">StreamSport </span>|
              <span class="stream-link">RMC</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-SD">SD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138599">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138592">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138592">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>ST</span>
          </div>
        </div>
        <a class="stream-info" href="https://streamsport.pro/live/ch5.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">StreamSport </span>|
              <span class="stream-link">SKY SPORT</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-SD">SD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138592">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138344">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138344">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SU</span>
          </div>
        </div>
        <a class="stream-info" href="http://successstudios.co/channel-b/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">successstudios </span>|
              <span class="stream-link">BT SPORT 1</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138344">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138337">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138337">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SP</span>
          </div>
        </div>
        <a class="stream-info" href="http://www.sportnews.to/sports/2020/premier-league-wolverhampton-wanderers-vs-arsenal-s2/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">Sportnews </span>|
              <span class="stream-link">Sky Sport Main Event</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138337">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138746">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138746">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>PO</span>
          </div>
        </div>
        <a class="stream-info" href="https://poscitech.com/wolverhampton-wanderers-vs-arsenal-3/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">poscitechstream </span>|
              <span class="stream-link">✔️Sky Sports Premier League</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138746">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138749">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138749">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>PO</span>
          </div>
        </div>
        <a class="stream-info" href="https://poscitech.com/wolverhampton-wanderers-vs-arsenal-6/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">poscitechstream </span>|
              <span class="stream-link">✔️ RMC Sport 1 France</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138749">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138748">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138748">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>PO</span>
          </div>
        </div>
        <a class="stream-info" href="https://poscitech.com/wolverhampton-wanderers-vs-arsenal-5/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">poscitechstream </span>|
              <span class="stream-link">✔️Sky Sport Football IT</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138748">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138094">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138094">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SP</span>
          </div>
        </div>
        <a class="stream-info" href="https://thematch.pw/c1.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">SportsZoneWEB </span>|
              <span class="stream-link">nbcsn</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138094">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138777">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138777">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>EN</span>
          </div>
        </div>
        <a class="stream-info" href="http://decimalnews.cc/to/hd5.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">enhdtv </span>|
              <span class="stream-link">Sky Premier League HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138777">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138778">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138778">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>EN</span>
          </div>
        </div>
        <a class="stream-info" href="http://decimalnews.cc/to/hd9.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">enhdtv </span>|
              <span class="stream-link">Bein Sports 2 HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138778">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138779">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138779">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>EN</span>
          </div>
        </div>
        <a class="stream-info" href="http://decimalnews.cc/to/hd10.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">enhdtv </span>|
              <span class="stream-link">Bein Sports 1 HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138779">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138800">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138800">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SO</span>
          </div>
        </div>
        <a class="stream-info" href="http://wuwza.com/vip1/skysport4de.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">soozyiswoozy </span>|
              <span class="stream-link">SKYSPORT 4</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-SD">SD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138800">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138832">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138832">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>DU</span>
          </div>
        </div>
        <a class="stream-info" href="http://www.dubz.to/watch/sports/live/soccer/stream1.html" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">dubsstreamz </span>|
              <span class="stream-link">SKY SPORTS 1080p</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138832">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="139000">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="139000">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>EN</span>
          </div>
        </div>
        <a class="stream-info" href="http://enjoyhd.live/hd/hd1.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">enjoyhd </span>|
              <span class="stream-link">SKY SPORTS MAIN EVENT HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="139000">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="139057">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="139057">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>EP</span>
          </div>
        </div>
        <a class="stream-info" href="http://eplstreams.best/wolverhampton-vs-arsenal/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">eplstreams </span>|
              <span class="stream-link">NBCSN</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="139057">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="139077">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="139077">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SP</span>
          </div>
        </div>
        <a class="stream-info" href="https://sports24.club/soccer/wolverhampton-vs-arsenal-epl1.html" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">sports24 </span>|
              <span class="stream-link">NBCSN HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="139077">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="139078">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="139078">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SP</span>
          </div>
        </div>
        <a class="stream-info" href="https://sports24.club/soccer/manchester-united-vs-bournemouth-epl2.html" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">sports24 </span>|
              <span class="stream-link">ESPN Sur</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="139078">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="139111">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="139111">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>XA</span>
          </div>
        </div>
        <a class="stream-info" href="https://strmachine.blogspot.com/2020/07/mc82ufuo.html" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">xamegoo </span>|
              <span class="stream-link">Sky Sports</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="139111">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="139112">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="139112">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>XA</span>
          </div>
        </div>
        <a class="stream-info" href="https://strmachine.blogspot.com/2020/07/msd7o3fg.html" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">xamegoo </span>|
              <span class="stream-link">Bein Sports</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="139112">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138112">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138112">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>CY</span>
          </div>
        </div>
        <a class="stream-info" href="http://www.cyfostreams.com/cyfo4.html" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">cyfostream </span>|
              <span class="stream-link">sky main event</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-SD">SD</span>
            <span class="label label-warning tt-3">3 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138112">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138005">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138005">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>IW</span>
          </div>
        </div>
        <a class="stream-info" href="https://iwizwig.com/epl-wolves-vs-arsenal/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">Iwizwigsports </span>|
              <span class="stream-link">✔️✔️ NBCSN HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138005">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138006">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138006">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>IW</span>
          </div>
        </div>
        <a class="stream-info" href="https://iwizwig.com/live-streams/wolves-vs-arsenal/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">Iwizwigsports </span>|
              <span class="stream-link">✔️ Sky Sports Premier League</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138006">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137141">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137141">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>PA</span>
          </div>
        </div>
        <a class="stream-info" href="http://papahd.live/wolverhampton-wanderers-vs-arsenal/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">papahdlive </span>|
              <span class="stream-link">BEIN SPORTS HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137141">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="118596">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="118596">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>FR</span>
          </div>
        </div>
        <a class="stream-info" href="http://www.freetvsports.com/p/premier-league-hd-soccer.html" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">Freesport </span>|
              <span class="stream-link">Premier League HD </span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="118596">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="121811">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="121811">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>RE</span>
          </div>
        </div>
        <a class="stream-info" href="http://live.buffstream1.com/Stream/ch-1.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">Redditstreams </span>|
              <span class="stream-link">BuffStream✔️</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="121811">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="121812">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="121812">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>RE</span>
          </div>
        </div>
        <a class="stream-info" href="http://live.buffstream1.com/Stream/ch-2.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">Redditstreams </span>|
              <span class="stream-link">BuffStream✔️</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-SD">SD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="121812">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="122872">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="122872">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SO</span>
          </div>
        </div>
        <a class="stream-info" href="https://www.soccer24hd.com/game/match/1779/Wolves-Vs-Arsenal.html" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">Soccer24HD </span>|
              <span class="stream-link">Bein Sport 11HD + Sky Sport Premier League</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="122872">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="128912">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="128912">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>MA</span>
          </div>
        </div>
        <a class="stream-info" href="http://mazymedias.com/previews/s10/?utm_source=footybite&amp;utm_medium=web&amp;title=Wolverhampton+Wanderers+vs+Arsenal" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">MazyStreams </span>|
              <span class="stream-link">SKY MAIN EVENT HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="128912">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="133134">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="133134">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SO</span>
          </div>
        </div>
        <a class="stream-info" href="http://www.soccerjumbotv4.me/040720/ch-2.html" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">soccerjumbo </span>|
              <span class="stream-link">SoccerJumboTV</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-SD">SD</span>
            <span class="label label-warning tt-3">3 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="133134">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="133837">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="133837">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SP</span>
          </div>
        </div>
        <a class="stream-info" href="https://sporetstream.com/west-ham-united-vs-southampton-2/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">sportystream </span>|
              <span class="stream-link">✅Sky Sports Football✅</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-3">3 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="133837">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="135499">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="135499">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SO</span>
          </div>
        </div>
        <a class="stream-info" href="http://wuwza.com/vip1/skysport1.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">soozyiswoozy </span>|
              <span class="stream-link">SKYSPORT MAIN EVENT</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-SD">SD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="135499">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="135500">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="135500">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SO</span>
          </div>
        </div>
        <a class="stream-info" href="http://wuwza.com/vip1/hd4.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">soozyiswoozy </span>|
              <span class="stream-link">SKYSPORT MAIN EVENT</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="135500">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="135501">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="135501">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SO</span>
          </div>
        </div>
        <a class="stream-info" href="http://wuwza.com/vip1/sfrsport1.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">soozyiswoozy </span>|
              <span class="stream-link">RMCSPORT 1</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-SD">SD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="135501">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="136361">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="136361">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>BT</span>
          </div>
        </div>
        <a class="stream-info" href="http://btstream.live/epl/ch1.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">btstream </span>|
              <span class="stream-link">NBCSN HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="136361">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="136999">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="136999">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>CO</span>
          </div>
        </div>
        <a class="stream-info" href="http://coswitmedia.com/soccer/tv20-2/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">coswitmedia </span>|
              <span class="stream-link">NBCSN</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-1">1 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="136999">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137142">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137142">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>PA</span>
          </div>
        </div>
        <a class="stream-info" href="http://papahd.live/wolverhampton-wanderers-vs-arsenal-2/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">papahdlive </span>|
              <span class="stream-link">NBCSN</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137142">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="118544">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="118544">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SP</span>
          </div>
        </div>
        <a class="stream-info" href="https://sporetstream.com/premier-league/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">sportystream </span>|
              <span class="stream-link">BT SPORT+ HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-3">3 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="118544">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137144">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137144">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>PA</span>
          </div>
        </div>
        <a class="stream-info" href="http://papahd.live/wolverhampton-wanderers-vs-arsenal-3/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">papahdlive </span>|
              <span class="stream-link">SKY SPORT</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137144">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137579">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137579">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>ST</span>
          </div>
        </div>
        <a class="stream-info" href="https://streamhd247.live/live-soccer-streaming-21.htm" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">streamhd247 </span>|
              <span class="stream-link">NBC SN</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-SD">SD</span>
            <span class="label label-warning tt-3">3 Ads</span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137579">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137808">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137808">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>DA</span>
          </div>
        </div>
        <a class="stream-info" href="https://daddylive.live/channels/stream-43.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">daddylive </span>|
              <span class="stream-link">NBCSN</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137808">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137809">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137809">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>DA</span>
          </div>
        </div>
        <a class="stream-info" href="https://daddylive.live/channels/stream-38.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">daddylive </span>|
              <span class="stream-link">Sky Sports Main Event</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137809">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137810">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137810">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>DA</span>
          </div>
        </div>
        <a class="stream-info" href="https://daddylive.live/channels/stream-5.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">daddylive </span>|
              <span class="stream-link">Sky Sports Premier League</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137810">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137811">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137811">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>DA</span>
          </div>
        </div>
        <a class="stream-info" href="https://daddylive.live/channels/stream-74.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">daddylive </span>|
              <span class="stream-link">Sport TV2 Portugal</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137811">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137812">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137812">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>DA</span>
          </div>
        </div>
        <a class="stream-info" href="https://daddylive.live/channels/stream-46.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">daddylive </span>|
              <span class="stream-link">Sky Sport Football IT </span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137812">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137813">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137813">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>DA</span>
          </div>
        </div>
        <a class="stream-info" href="https://daddylive.live/channels/stream-73.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">daddylive </span>|
              <span class="stream-link">Canal+ Sport 2 Poland</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137813">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137852">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137852">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>HO</span>
          </div>
        </div>
        <a class="stream-info" href="https://homosports.site/fzony-union.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">homosport </span>|
              <span class="stream-link">NBCSN EPL</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-3">3 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137852">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137854">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137854">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>HO</span>
          </div>
        </div>
        <a class="stream-info" href="https://homosports.site/fzony-fc-aue.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">homosport </span>|
              <span class="stream-link">Sky Sports UK</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-3">3 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137854">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137925">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137925">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>JB</span>
          </div>
        </div>
        <a class="stream-info" href="http://www.jblivestream.com/event/wolverhampton-wanderers-vs-arsenal" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">jblivestream </span>|
              <span class="stream-link">NBCSN</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-SD">SD</span>
            <span class="label label-warning tt-2">2 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137925">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137955">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137955">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>BA</span>
          </div>
        </div>
        <a class="stream-info" href="https://tonnestream.xyz/en/cdn/live.cdnz.one-3265.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">banofgood </span>|
              <span class="stream-link">Sky Sports Main Event</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-3">3 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137955">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137973">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137973">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>BU</span>
          </div>
        </div>
        <a class="stream-info" href="https://budcenter.site/watch_41753.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">budcenter </span>|
              <span class="stream-link">Sky Sports Main Event HD</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-HD">HD</span>
            <span class="label label-warning tt-3">3 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137973">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="139237">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="139237">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>TS</span>
          </div>
        </div>
        <a class="stream-info" href="https://tsportv18.do.am/ace1.html" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">tsportv </span>|
              <span class="stream-link">Sky Sports</span></span>
          </div>
          <div class="labels">
            <span class="label label-danger misr-SD">SD</span>
            <span class="label label-warning tt-3">3 Ads</span>
            <span class="label label-primary"><img src="https://101placeonline.com/smartphone.png" class="img-fluid mobile"></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="139237">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

<div class="row">
<div class="col-lg">
  <!-- Default Card Example -->
  <div class="card mb-4">
    <div class="card-header" style="text-decoration: underline;">
      <h2>Acestream</h2>
    </div>
    <div class="card-body" style="background-color: #f8f7fc;">
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="135216">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="135216">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>HO</span>
          </div>
        </div>
        <a class="stream-info" href="http://hockeynews.site/events/2020/ww-vs-ars/" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">Hockeynews
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">SKY SPORT MAIN EVENT</span></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="135216">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138805">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138805">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>NB</span>
          </div>
        </div>
        <a class="stream-info" href="http://nbanownews.com/1-soccer" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">nbanownews
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">SKY SPORT UK COMMENTARY</span></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138805">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138958">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138958">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>LA</span>
          </div>
        </div>
        <a class="stream-info" href="https://ladsnbastands.com/adumain3/" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">ladstreams
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>| <span class="stream-link">SKY SPORTS FEED</span></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138958">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="139224">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="139224">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>BL</span>
          </div>
        </div>
        <a class="stream-info" href="http://elixx.me/AMatch.html" target="_blank">
          <div class="stream-link-info">
            <span class="username verified-streamer"><span class="first">bluejetset
                <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png" alt=""> </span>|
              <span class="stream-link">ACESTREAM ( OKKO SPORT ) 720p 5000 kbps 50fps</span></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="139224">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="136434">
            ▲
          </div>
          <div class="votes-count">
            2
          </div>
          <div class="dodownvote" data-stream-id="136434">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>SO</span>
          </div>
        </div>
        <a class="stream-info" href="https://redsoccer.info/xo_event/1/" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">Soccer_Info </span>|
              <span class="stream-link">ACESTREAM HD</span></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="136434">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="128913">
            ▲
          </div>
          <div class="votes-count">
            1
          </div>
          <div class="dodownvote" data-stream-id="128913">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>MA</span>
          </div>
        </div>
        <a class="stream-info" href="http://mazymedias.com/previews/s10/?utm_source=footybite&amp;utm_medium=acestreams&amp;title=Wolverhampton+Wanderers+vs+Arsenal" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">MazyStreams </span>|
              <span class="stream-link">SKY MAIN EVENT HD</span></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="128913">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137896">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137896">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>DA</span>
          </div>
        </div>
        <a class="stream-info" href="https://daddylive.live/channels/ace1.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">daddylive </span>|
              <span class="stream-link">Sky Sports Main Event</span></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137896">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="137903">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="137903">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>DA</span>
          </div>
        </div>
        <a class="stream-info" href="https://daddylive.live/channels/ace6.php" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">daddylive </span>|
              <span class="stream-link">NBCSN</span></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="137903">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="138352">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="138352">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>TS</span>
          </div>
        </div>
        <a class="stream-info" href="https://tsportv18.do.am/ace.html" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">tsportv </span>|
              <span class="stream-link">NBCSN</span></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="138352">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
      <div class="stream-item">
        <div class="votes">
          <div class="doupvote" data-stream-id="139082">
            ▲
          </div>
          <div class="votes-count">
            0
          </div>
          <div class="dodownvote" data-stream-id="139082">
            ▼
          </div>
        </div>
        <div class="avatar-container">
          <div class="avatar">
            <span>DU</span>
          </div>
        </div>
        <a class="stream-info" href="http://www.dubsstreamz.com/aceski.html" target="_blank">
          <div class="stream-link-info">
            <span class="username streamer"><span class="first">dubsstreamz </span>|
              <span class="stream-link">SKY SPORTS 1080p</span></span>
          </div>
        </a>
        <div class="send-report-section" data-stream-id="139082">
          <a href="javascript:void(0)">Send Report</a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</body></html>
`;

export interface WebsiteLinkInformation {
  channelName: string;
  quality: string;
  websiteLink: string;
}

/**
 * Get all website links from redditEventLink
 * @param redditEventLink Link to get stream links from
 */
export default async function getWebsiteLinks(
  redditEventLink: string | null
): Promise<WebsiteLinkInformation[]> {
  if (redditEventLink === null) {
    return [];
  }

  const pathName = url.parse(redditEventLink).pathname;

  if (pathName === null) {
    return [];
  }

  const html = await getHtmlFromUrl(
    `https://101placeonline.com/streams-table/${
      pathName.split("/").reverse()[0]
    }/soccer`
  );

  let websiteLinkInformations: WebsiteLinkInformation[] = [];

  const titleElements: Cheerio = $(html)
    .find("div.col-lg")
    .first()
    .find("div.stream-item");

  titleElements.each(function (this: Cheerio) {
    const channelName: string = $(this)
      .find("span.stream-link")
      .first()
      .text()
      .trim();

    const quality: string = $(this)
      .find("span.label-danger")
      .first()
      .text()
      .trim();

    const websiteLink: string | undefined = $(this)
      .find("a.stream-info")
      .first()
      .attr("href");

    if (websiteLink !== undefined) {
      const websiteDomain: string | null = url.parse(websiteLink).hostname;

      if (websiteDomain === null) {
        return [];
      }

      if (supportedSites[websiteDomain]) {
        websiteLinkInformations.push({
          channelName,
          quality,
          websiteLink,
        });
      }
    }
  });

  return websiteLinkInformations;
}
