import $ from "cheerio";
import url from "url";

import delay from "./delay";
import supportedSites from "./supportedSites";
import { getHtmlFromUrl } from "./get";

const SAMPLE_HTML = `<div class="row">
<div class="col-lg">
    <!-- Default Card Example -->
    <div class="card mb-4">
        <div class="card-header" style="text-decoration:underline">
            <h2>Web</h2>
        </div>
        <div class="card-body" style="background-color: #f7fbe1">
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="145473">
                            ▲
                        </div>
                        <div class="votes-count">
                            83
                        </div>
                        <div class="dodownvote" data-stream-id="145473">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DV</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://myoplay.club/oplive/"  target="_blank" href="https://myoplay.club/oplive/">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">Dvaix                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">EN</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">4MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Premier League 1080P FULL HD ( No Crowd Sound )</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://myoplay.club/oplive/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://myoplay.club/oplive/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="150091">
                            ▲
                        </div>
                        <div class="votes-count">
                            25
                        </div>
                        <div class="dodownvote" data-stream-id="150091">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>GI</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://givemereddit.stream/soccer/arsenal-live-stream"  target="_blank" href="http://givemereddit.stream/soccer/arsenal-live-stream">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">givemeredditstream                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORTS PREMIER LEAGUE HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://givemereddit.stream/soccer/arsenal-live-stream"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://givemereddit.stream/soccer/arsenal-live-stream"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149726">
                            ▲
                        </div>
                        <div class="votes-count">
                            23
                        </div>
                        <div class="dodownvote" data-stream-id="149726">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>WE</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://liveonscore.net/soccer-streams/tottenham-hotspur-vs-arsenal/?link=2"  target="_blank" href="http://liveonscore.net/soccer-streams/tottenham-hotspur-vs-arsenal/?link=2">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">Weak_Spell                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://liveonscore.net/soccer-streams/tottenham-hotspur-vs-arsenal/?link=2"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://liveonscore.net/soccer-streams/tottenham-hotspur-vs-arsenal/?link=2"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="144964">
                            ▲
                        </div>
                        <div class="votes-count">
                            6
                        </div>
                        <div class="dodownvote" data-stream-id="144964">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>TH</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://www.blacktiesports.net/soccer1"  target="_blank" href="http://www.blacktiesports.net/soccer1">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">thebaldstreamer                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://www.blacktiesports.net/soccer1"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://www.blacktiesports.net/soccer1"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="145690">
                            ▲
                        </div>
                        <div class="votes-count">
                            3
                        </div>
                        <div class="dodownvote" data-stream-id="145690">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>BL</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://elixx.me/evalencia.html"  target="_blank" href="http://elixx.me/evalencia.html">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">bluejetset                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-520P">520P</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBC SPORTS NETWORK</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://elixx.me/evalencia.html"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://elixx.me/evalencia.html"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="145635">
                            ▲
                        </div>
                        <div class="votes-count">
                            2
                        </div>
                        <div class="dodownvote" data-stream-id="145635">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>CY</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://cyclingentertainment.online/corona/2020/tottenham-hotspur-vs-arsenal/"  target="_blank" href="http://cyclingentertainment.online/corona/2020/tottenham-hotspur-vs-arsenal/">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">CyclingEntertainment                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORTS MAIN EVENTS HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://cyclingentertainment.online/corona/2020/tottenham-hotspur-vs-arsenal/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://cyclingentertainment.online/corona/2020/tottenham-hotspur-vs-arsenal/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146246">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="146246">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>RA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://soccer.streamspass.com/live.html?stream=stream_4&amp;title=Tottenham+vs+Arsenal+Live+Stream"  target="_blank" href="http://soccer.streamspass.com/live.html?stream=stream_4&amp;title=Tottenham+vs+Arsenal+Live+Stream">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">RainoStream                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-520P">520P</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-4">4 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports Premier League		</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://soccer.streamspass.com/live.html?stream=stream_4&amp;title=Tottenham+vs+Arsenal+Live+Stream"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://soccer.streamspass.com/live.html?stream=stream_4&amp;title=Tottenham+vs+Arsenal+Live+Stream"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146194">
                            ▲
                        </div>
                        <div class="votes-count">
                            3
                        </div>
                        <div class="dodownvote" data-stream-id="146194">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>LA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://ladsnbastands.com/ladsnews-sky.html"  target="_blank" href="https://ladsnbastands.com/ladsnews-sky.html">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">ladstreams                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORTS FEED</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://ladsnbastands.com/ladsnews-sky.html"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://ladsnbastands.com/ladsnews-sky.html"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="147344">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="147344">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SP</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://footballstream.to/frame/ch1.php"  target="_blank" href="http://footballstream.to/frame/ch1.php">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">sportsonme                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">4MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports Premier League FULL HD 1080p 60FPS</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://footballstream.to/frame/ch1.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://footballstream.to/frame/ch1.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146334">
                            ▲
                        </div>
                        <div class="votes-count">
                            5
                        </div>
                        <div class="dodownvote" data-stream-id="146334">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>HO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://hockeynews.site/events/2020/th-vs-ars/"  target="_blank" href="http://hockeynews.site/events/2020/th-vs-ars/">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">Hockeynews                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORT MAIN EVENT</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://hockeynews.site/events/2020/th-vs-ars/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://hockeynews.site/events/2020/th-vs-ars/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146039">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="146039">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>NB</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://nbanownews.com/1-soccer/"  target="_blank" href="http://nbanownews.com/1-soccer/">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">nbanownews                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORT UK COMMENTARY</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://nbanownews.com/1-soccer/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://nbanownews.com/1-soccer/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="148522">
                            ▲
                        </div>
                        <div class="votes-count">
                            9
                        </div>
                        <div class="dodownvote" data-stream-id="148522">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>YO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://60fps.live/tottenham-hotspur-vs-arsenal/?link=1&amp;utm_source=footybite"  target="_blank" href="http://60fps.live/tottenham-hotspur-vs-arsenal/?link=1&amp;utm_source=footybite">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">youpit                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBC Sports Network + Sky Sports Main Event</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://60fps.live/tottenham-hotspur-vs-arsenal/?link=1&amp;utm_source=footybite"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://60fps.live/tottenham-hotspur-vs-arsenal/?link=1&amp;utm_source=footybite"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149778">
                            ▲
                        </div>
                        <div class="votes-count">
                            2
                        </div>
                        <div class="dodownvote" data-stream-id="149778">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>CR</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://stream-cr7.net/embed/2.php"  target="_blank" href="http://stream-cr7.net/embed/2.php">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">cr7                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORTS MAIN EVENT FHD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://stream-cr7.net/embed/2.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://stream-cr7.net/embed/2.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149849">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="149849">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>MN</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://hdstreams.club/hd/ch5.php"  target="_blank" href="http://hdstreams.club/hd/ch5.php">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">mntvlive13                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports Premier League (ABR)</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://hdstreams.club/hd/ch5.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://hdstreams.club/hd/ch5.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149861">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="149861">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>MA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://markky88.com/video/tottenham-hotspur-vs-arsenal/"  target="_blank" href="http://markky88.com/video/tottenham-hotspur-vs-arsenal/">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">Markky                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">3000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports Main Event</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://markky88.com/video/tottenham-hotspur-vs-arsenal/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://markky88.com/video/tottenham-hotspur-vs-arsenal/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146198">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="146198">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>LA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://ladsnbastands.com/ladsnews02-nc.html"  target="_blank" href="https://ladsnbastands.com/ladsnews02-nc.html">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">ladstreams                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN FEED</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://ladsnbastands.com/ladsnews02-nc.html"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://ladsnbastands.com/ladsnews02-nc.html"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149725">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="149725">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>WE</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://liveonscore.net/soccer-streams/tottenham-hotspur-vs-arsenal/"  target="_blank" href="http://liveonscore.net/soccer-streams/tottenham-hotspur-vs-arsenal/">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">Weak_Spell                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports Main Event HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://liveonscore.net/soccer-streams/tottenham-hotspur-vs-arsenal/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://liveonscore.net/soccer-streams/tottenham-hotspur-vs-arsenal/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="150085">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="150085">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>BL</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://elixx.me/porto.html"  target="_blank" href="https://elixx.me/porto.html">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">bluejetset                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-520P">520P</span>
                                <span  class="label label-primary language">PT</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SPORTTV 1  PORTUGAL</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://elixx.me/porto.html"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://elixx.me/porto.html"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="147345">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="147345">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SP</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://footballstream.to/frame/ch2.php"  target="_blank" href="http://footballstream.to/frame/ch2.php">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">sportsonme                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">4MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN FULL HD 1080p 60FPS</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://footballstream.to/frame/ch2.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://footballstream.to/frame/ch2.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149862">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149862">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>MA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://markky88.com/video/tottenham-hotspur-vs-arsenal/?sv=2"  target="_blank" href="http://markky88.com/video/tottenham-hotspur-vs-arsenal/?sv=2">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">Markky                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">3000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://markky88.com/video/tottenham-hotspur-vs-arsenal/?sv=2"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://markky88.com/video/tottenham-hotspur-vs-arsenal/?sv=2"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="147461">
                            ▲
                        </div>
                        <div class="votes-count">
                            4
                        </div>
                        <div class="dodownvote" data-stream-id="147461">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>MA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://mazymedias.com/previews/s10/?utm_source=footybite&amp;utm_medium=web&amp;title=Tottenham Hotspur+vs+Arsenal"  target="_blank" href="http://mazymedias.com/previews/s10/?utm_source=footybite&amp;utm_medium=web&amp;title=Tottenham Hotspur+vs+Arsenal">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">MazyStreams  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORTS MAIN EVENT HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://mazymedias.com/previews/s10/?utm_source=footybite&amp;utm_medium=web&amp;title=Tottenham Hotspur+vs+Arsenal"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://mazymedias.com/previews/s10/?utm_source=footybite&amp;utm_medium=web&amp;title=Tottenham Hotspur+vs+Arsenal"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146468">
                            ▲
                        </div>
                        <div class="votes-count">
                            2
                        </div>
                        <div class="dodownvote" data-stream-id="146468">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SU</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://successstudios.co/link-1/"  target="_blank" href="http://successstudios.co/link-1/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">successstudios  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">8MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">BT SPORT 1</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://successstudios.co/link-1/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://successstudios.co/link-1/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149834">
                            ▲
                        </div>
                        <div class="votes-count">
                            2
                        </div>
                        <div class="dodownvote" data-stream-id="149834">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SP</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://sports24.club/soccer/ Tottenham-vs-arsenal-epl1.html"  target="_blank" href="http://sports24.club/soccer/ Tottenham-vs-arsenal-epl1.html">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">sports24  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://sports24.club/soccer/ Tottenham-vs-arsenal-epl1.html"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://sports24.club/soccer/ Tottenham-vs-arsenal-epl1.html"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149892">
                            ▲
                        </div>
                        <div class="votes-count">
                            2
                        </div>
                        <div class="dodownvote" data-stream-id="149892">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DU</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://www.dubsstreamz.com/watch/sports/live/soccer/stream1.html"  target="_blank" href="http://www.dubsstreamz.com/watch/sports/live/soccer/stream1.html">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">dubsstreamz  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORTS 1080p</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://www.dubsstreamz.com/watch/sports/live/soccer/stream1.html"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://www.dubsstreamz.com/watch/sports/live/soccer/stream1.html"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="145199">
                            ▲
                        </div>
                        <div class="votes-count">
                            2
                        </div>
                        <div class="dodownvote" data-stream-id="145199">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>CY</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://www.cyfostreams.com/cyfo8.html"  target="_blank" href="http://www.cyfostreams.com/cyfo8.html">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">cyfostream  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-SD">SD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                    <span class="label label-channel-name">sky main event</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://www.cyfostreams.com/cyfo8.html"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://www.cyfostreams.com/cyfo8.html"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149351">
                            ▲
                        </div>
                        <div class="votes-count">
                            2
                        </div>
                        <div class="dodownvote" data-stream-id="149351">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>TS</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://tsportv18.do.am/ace1.html"  target="_blank" href="https://tsportv18.do.am/ace1.html">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">tsportv  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-SD">SD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://tsportv18.do.am/ace1.html"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://tsportv18.do.am/ace1.html"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="145512">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="145512">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>PA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://papahd.live/tottenham-hotspur-vs-arsenal/"  target="_blank" href="http://papahd.live/tottenham-hotspur-vs-arsenal/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">papahdlive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">3000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">BEIN SPORTS HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://papahd.live/tottenham-hotspur-vs-arsenal/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://papahd.live/tottenham-hotspur-vs-arsenal/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149098">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="149098">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://redsoccer.info/xo_event/e3/"  target="_blank" href="https://redsoccer.info/xo_event/e3/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">Soccer_Info  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORT MAIN EVENT HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://redsoccer.info/xo_event/e3/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://redsoccer.info/xo_event/e3/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149543">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="149543">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>FR</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://freelive365.com/player.php?id=3017&amp;code=4964&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank" href="https://freelive365.com/player.php?id=3017&amp;code=4964&amp;evento=%20tottenham%20hotspur%20vs%20arsenal">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">freelive365  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-520P">520P</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Byetv p2p</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://freelive365.com/player.php?id=3017&amp;code=4964&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://freelive365.com/player.php?id=3017&amp;code=4964&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146197">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="146197">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>HO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://homosports.site/fzony-union.php"  target="_blank" href="https://homosports.site/fzony-union.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">homosport  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">EN</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN EPL</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://homosports.site/fzony-union.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://homosports.site/fzony-union.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149422">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149422">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>RO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://newhdmovies2020.xyz/12/arsenal.php"  target="_blank" href="https://newhdmovies2020.xyz/12/arsenal.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">rohailaamir2001  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-520P">520P</span>
                                <span  class="label label-primary language">EN</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                    <span class="label label-channel-name">SoccerLover</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://newhdmovies2020.xyz/12/arsenal.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://newhdmovies2020.xyz/12/arsenal.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149535">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149535">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>FR</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://freelive365.com/player.php?id=3017&amp;code=4960&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank" href="https://freelive365.com/player.php?id=3017&amp;code=4960&amp;evento=%20tottenham%20hotspur%20vs%20arsenal">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">freelive365  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-520P">520P</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Byetv p2p</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://freelive365.com/player.php?id=3017&amp;code=4960&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://freelive365.com/player.php?id=3017&amp;code=4960&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149553">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149553">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>FR</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://freelive365.com/player.php?id=3017&amp;code=4956&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank" href="https://freelive365.com/player.php?id=3017&amp;code=4956&amp;evento=%20tottenham%20hotspur%20vs%20arsenal">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">freelive365  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-520P">520P</span>
                                <span  class="label label-primary language">POR</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Byetv p2p</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://freelive365.com/player.php?id=3017&amp;code=4956&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://freelive365.com/player.php?id=3017&amp;code=4956&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149539">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149539">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>FR</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://freelive365.com/player.php?id=3017&amp;code=4983&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank" href="https://freelive365.com/player.php?id=3017&amp;code=4983&amp;evento=%20tottenham%20hotspur%20vs%20arsenal">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">freelive365  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-520P">520P</span>
                                <span  class="label label-primary language">POL</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Byetv p2p</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://freelive365.com/player.php?id=3017&amp;code=4983&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://freelive365.com/player.php?id=3017&amp;code=4983&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149210">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149210">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>FO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://vivofutballtv.xyz/12/Arsenal-pt1.php"  target="_blank" href="https://vivofutballtv.xyz/12/Arsenal-pt1.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">footballstreampw  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">PT</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Ronaldo Sports</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://vivofutballtv.xyz/12/Arsenal-pt1.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://vivofutballtv.xyz/12/Arsenal-pt1.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149546">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149546">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>FR</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://freelive365.com/player.php?id=3017&amp;code=4972&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank" href="https://freelive365.com/player.php?id=3017&amp;code=4972&amp;evento=%20tottenham%20hotspur%20vs%20arsenal">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">freelive365  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-520P">520P</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Byetv p2p</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://freelive365.com/player.php?id=3017&amp;code=4972&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://freelive365.com/player.php?id=3017&amp;code=4972&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149549">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149549">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>FR</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://freelive365.com/player.php?id=3017&amp;code=4974&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank" href="https://freelive365.com/player.php?id=3017&amp;code=4974&amp;evento=%20tottenham%20hotspur%20vs%20arsenal">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">freelive365  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-520P">520P</span>
                                <span  class="label label-primary language">SPA</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Byetv p2p</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://freelive365.com/player.php?id=3017&amp;code=4974&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://freelive365.com/player.php?id=3017&amp;code=4974&amp;evento=%20tottenham%20hotspur%20vs%20arsenal"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="144944">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="144944">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://wuwza.com/vip1/skysport1.php"  target="_blank" href="http://wuwza.com/vip1/skysport1.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">soozyiswoozy  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-SD">SD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKYSPORT MAIN EVENT</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://wuwza.com/vip1/skysport1.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://wuwza.com/vip1/skysport1.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149817">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149817">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>BO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://soccerstreams.co/stream43.php"  target="_blank" href="http://soccerstreams.co/stream43.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">Bobwillis  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Soccer Streams - Nbcsn</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://soccerstreams.co/stream43.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://soccerstreams.co/stream43.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149767">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149767">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SP</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://www.sportnews.to/sports/2020/premier-league-tottenham-hotspur-vs-arsenal-s1/"  target="_blank" href="http://www.sportnews.to/sports/2020/premier-league-tottenham-hotspur-vs-arsenal-s1/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">Sportnews  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">4MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sport Main Event</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://www.sportnews.to/sports/2020/premier-league-tottenham-hotspur-vs-arsenal-s1/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://www.sportnews.to/sports/2020/premier-league-tottenham-hotspur-vs-arsenal-s1/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149791">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149791">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SP</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://sporetstream.com/tottenham-hotspur-vs-arsenal/"  target="_blank" href="https://sporetstream.com/tottenham-hotspur-vs-arsenal/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">sportystream  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">✅ NBCSN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://sporetstream.com/tottenham-hotspur-vs-arsenal/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://sporetstream.com/tottenham-hotspur-vs-arsenal/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149792">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149792">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>MY</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://soccerstreams.club/show.html?id=541495&amp;date=1594567800&amp;meta=Tottenham%20Hotspur%20vs%20Arsenal"  target="_blank" href="https://soccerstreams.club/show.html?id=541495&amp;date=1594567800&amp;meta=Tottenham%20Hotspur%20vs%20Arsenal">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">Mygoodstream  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-0">0 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://soccerstreams.club/show.html?id=541495&amp;date=1594567800&amp;meta=Tottenham%20Hotspur%20vs%20Arsenal"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://soccerstreams.club/show.html?id=541495&amp;date=1594567800&amp;meta=Tottenham%20Hotspur%20vs%20Arsenal"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149168">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149168">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>EN</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://decimalnews.cc/to/hd9.php"  target="_blank" href="http://decimalnews.cc/to/hd9.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">enhdtv  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Bein Sports 2 HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://decimalnews.cc/to/hd9.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://decimalnews.cc/to/hd9.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149818">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149818">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>BO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://soccerstreams.co/stream38.php"  target="_blank" href="http://soccerstreams.co/stream38.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">Bobwillis  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">soccer streams - Sky Sports</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://soccerstreams.co/stream38.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://soccerstreams.co/stream38.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149827">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149827">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>UN</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://unitedbacke.xyz/12epl/"  target="_blank" href="https://unitedbacke.xyz/12epl/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">unitedbacke  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://unitedbacke.xyz/12epl/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://unitedbacke.xyz/12epl/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149838">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149838">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>JB</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://www.jblivestream.com/event/tottenham-hotspur-vs-arsenal"  target="_blank" href="http://www.jblivestream.com/event/tottenham-hotspur-vs-arsenal">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">jblivestream  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-SD">SD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://www.jblivestream.com/event/tottenham-hotspur-vs-arsenal"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://www.jblivestream.com/event/tottenham-hotspur-vs-arsenal"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149848">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149848">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://www.soccer24hd.com/game/match/1865/Tottenham-Vs-Arsenal.html"  target="_blank" href="https://www.soccer24hd.com/game/match/1865/Tottenham-Vs-Arsenal.html">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">Soccer24HD  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Bein Sport 11HD (Multi Quality)</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://www.soccer24hd.com/game/match/1865/Tottenham-Vs-Arsenal.html"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://www.soccer24hd.com/game/match/1865/Tottenham-Vs-Arsenal.html"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149896">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149896">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SP</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://thematch.pw/c1.php"  target="_blank" href="https://thematch.pw/c1.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">SportsZoneWEB  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://thematch.pw/c1.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://thematch.pw/c1.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149907">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149907">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>EP</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://eplstreams.best/tot-vs-arsnal/"  target="_blank" href="http://eplstreams.best/tot-vs-arsnal/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">eplstreams  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">8MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://eplstreams.best/tot-vs-arsnal/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://eplstreams.best/tot-vs-arsnal/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="150039">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="150039">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>TR</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://www.techtricksng.com/news/twitter-now-integrated-fully-into-opera-desktop-browser/"  target="_blank" href="http://www.techtricksng.com/news/twitter-now-integrated-fully-into-opera-desktop-browser/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">tricksng  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-SD">SD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBC</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://www.techtricksng.com/news/twitter-now-integrated-fully-into-opera-desktop-browser/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://www.techtricksng.com/news/twitter-now-integrated-fully-into-opera-desktop-browser/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="150042">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="150042">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>XA</span>
                        </div>
                    </div>
                    <a class="stream-info" href="https://strmachine.blogspot.com/2020/07/jlksd8f23.html" target="_blank" href="http://strmachine.blogspot.com/2020/07/jlksd8f23.html">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">xamegoo  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a href="https://strmachine.blogspot.com/2020/07/jlksd8f23.html" target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a href="https://strmachine.blogspot.com/2020/07/jlksd8f23.html" target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="150043">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="150043">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>XA</span>
                        </div>
                    </div>
                    <a class="stream-info" href="https://strmachine.blogspot.com/2020/07/sdfh23iadf.html" target="_blank" href="http://strmachine.blogspot.com/2020/07/sdfh23iadf.html">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">xamegoo  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a href="https://strmachine.blogspot.com/2020/07/sdfh23iadf.html" target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a href="https://strmachine.blogspot.com/2020/07/sdfh23iadf.html" target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149209">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149209">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>FO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://vivofutballtv.xyz/12/Arsenal-2.php"  target="_blank" href="https://vivofutballtv.xyz/12/Arsenal-2.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">footballstreampw  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">EN</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Vivo Futball Tv</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://vivofutballtv.xyz/12/Arsenal-2.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://vivofutballtv.xyz/12/Arsenal-2.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149117">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149117">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>PO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://poscitech.com/tottenham-vs-arsenal/"  target="_blank" href="https://poscitech.com/tottenham-vs-arsenal/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">poscitechsstream  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name"> NBCSN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://poscitech.com/tottenham-vs-arsenal/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://poscitech.com/tottenham-vs-arsenal/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149167">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149167">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>EN</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://decimalnews.cc/to/hd8.php"  target="_blank" href="http://decimalnews.cc/to/hd8.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">enhdtv  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Bein Sports 11 HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://decimalnews.cc/to/hd8.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://decimalnews.cc/to/hd8.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146262">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="146262">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://daddylive.live/channels/stream-5.php"  target="_blank" href="https://daddylive.live/channels/stream-5.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">daddylive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports Premier League</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://daddylive.live/channels/stream-5.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://daddylive.live/channels/stream-5.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="144946">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="144946">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://wuwza.com/vip1/sfrsport1.php"  target="_blank" href="http://wuwza.com/vip1/sfrsport1.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">soozyiswoozy  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-SD">SD</span>
                                <span  class="label label-primary language">FRE</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">RMCSPORT 1</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://wuwza.com/vip1/sfrsport1.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://wuwza.com/vip1/sfrsport1.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="145082">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="145082">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>CO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://coswitmedia.com/soccer/tv47-2/"  target="_blank" href="http://coswitmedia.com/soccer/tv47-2/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">coswitmedia  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://coswitmedia.com/soccer/tv47-2/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://coswitmedia.com/soccer/tv47-2/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="145513">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="145513">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>PA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://papahd.live/tottenham-hotspur-vs-arsenal-2/"  target="_blank" href="http://papahd.live/tottenham-hotspur-vs-arsenal-2/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">papahdlive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://papahd.live/tottenham-hotspur-vs-arsenal-2/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://papahd.live/tottenham-hotspur-vs-arsenal-2/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="145514">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="145514">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>PA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://papahd.live/tottenham-hotspur-vs-arsenal-3/"  target="_blank" href="http://papahd.live/tottenham-hotspur-vs-arsenal-3/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">papahdlive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORT</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://papahd.live/tottenham-hotspur-vs-arsenal-3/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://papahd.live/tottenham-hotspur-vs-arsenal-3/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="145515">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="145515">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>PA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://papahd.live/tottenham-hotspur-vs-arsenal-4/"  target="_blank" href="http://papahd.live/tottenham-hotspur-vs-arsenal-4/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">papahdlive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">SPA</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">ESPN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://papahd.live/tottenham-hotspur-vs-arsenal-4/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://papahd.live/tottenham-hotspur-vs-arsenal-4/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="145516">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="145516">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>PA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://papahd.live/tottenham-hotspur-vs-arsenal-5/"  target="_blank" href="http://papahd.live/tottenham-hotspur-vs-arsenal-5/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">papahdlive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">POR</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SPORT TV</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://papahd.live/tottenham-hotspur-vs-arsenal-5/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://papahd.live/tottenham-hotspur-vs-arsenal-5/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="145518">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="145518">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>PA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://papahd.live/tottenham-hotspur-vs-arsenal-6/"  target="_blank" href="http://papahd.live/tottenham-hotspur-vs-arsenal-6/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">papahdlive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ITA</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORT IT</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://papahd.live/tottenham-hotspur-vs-arsenal-6/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://papahd.live/tottenham-hotspur-vs-arsenal-6/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="145684">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="145684">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://www.soccerjumbotv4.me/120720/ch-4.html"  target="_blank" href="http://www.soccerjumbotv4.me/120720/ch-4.html">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">soccerjumbo  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-SD">SD</span>
                                <span  class="label label-primary language">EN</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SoccerJumboTV</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://www.soccerjumbotv4.me/120720/ch-4.html"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://www.soccerjumbotv4.me/120720/ch-4.html"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146202">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="146202">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>HO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://homosports.site/fzony-fc-aue.php"  target="_blank" href="https://homosports.site/fzony-fc-aue.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">homosport  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">EN</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports UK</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://homosports.site/fzony-fc-aue.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://homosports.site/fzony-fc-aue.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146254">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="146254">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://daddylive.live/channels/stream-43.php"  target="_blank" href="https://daddylive.live/channels/stream-43.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">daddylive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://daddylive.live/channels/stream-43.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://daddylive.live/channels/stream-43.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146258">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="146258">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://daddylive.live/channels/stream-38.php"  target="_blank" href="https://daddylive.live/channels/stream-38.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">daddylive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports Main Event</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://daddylive.live/channels/stream-38.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://daddylive.live/channels/stream-38.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146270">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="146270">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://daddylive.live/channels/stream-49.php"  target="_blank" href="https://daddylive.live/channels/stream-49.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">daddylive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">POR</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sport TV1 Portugal</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://daddylive.live/channels/stream-49.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://daddylive.live/channels/stream-49.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149166">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149166">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>EN</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://decimalnews.cc/to/hd5.php"  target="_blank" href="http://decimalnews.cc/to/hd5.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">enhdtv  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">512KB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Premier League HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://decimalnews.cc/to/hd5.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://decimalnews.cc/to/hd5.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146274">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="146274">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://daddylive.live/channels/stream-48.php"  target="_blank" href="https://daddylive.live/channels/stream-48.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">daddylive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">POL</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Canal+ Sport Poland</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://daddylive.live/channels/stream-48.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://daddylive.live/channels/stream-48.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146278">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="146278">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://daddylive.live/channels/stream-46.php"  target="_blank" href="https://daddylive.live/channels/stream-46.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">daddylive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ITA</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sport Football IT</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://daddylive.live/channels/stream-46.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://daddylive.live/channels/stream-46.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146281">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="146281">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://daddylive.live/channels/stream-81.php"  target="_blank" href="https://daddylive.live/channels/stream-81.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">daddylive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">SPA</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">ESPN Brasil</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://daddylive.live/channels/stream-81.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://daddylive.live/channels/stream-81.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146740">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="146740">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>BU</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://budcenter.site/watch_41753.php"  target="_blank" href="https://budcenter.site/watch_41753.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">budcenter  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">EN</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SuperSport3</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://budcenter.site/watch_41753.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://budcenter.site/watch_41753.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146916">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="146916">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>BA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://tonnestream.xyz/en/cdn/live.cdnz.one-3265.php"  target="_blank" href="https://tonnestream.xyz/en/cdn/live.cdnz.one-3265.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">banofgood  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">EN</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports Main Event</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://tonnestream.xyz/en/cdn/live.cdnz.one-3265.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://tonnestream.xyz/en/cdn/live.cdnz.one-3265.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="148026">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="148026">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>OV</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://www.ovostreams.com/tottenham-va-arsenal.php"  target="_blank" href="http://www.ovostreams.com/tottenham-va-arsenal.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">ovostreams  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN </span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://www.ovostreams.com/tottenham-va-arsenal.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://www.ovostreams.com/tottenham-va-arsenal.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="148045">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="148045">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>OV</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://www.ovostreams.com/tottenham-va-arsenal-live-stream.php"  target="_blank" href="http://www.ovostreams.com/tottenham-va-arsenal-live-stream.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">ovostreams  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-520P">520P</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sport</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://www.ovostreams.com/tottenham-va-arsenal-live-stream.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://www.ovostreams.com/tottenham-va-arsenal-live-stream.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="148494">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="148494">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>HQ</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://www.hqlive.xyz/p/5.html"  target="_blank" href="http://www.hqlive.xyz/p/5.html">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">hqlive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Hqlive</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://www.hqlive.xyz/p/5.html"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://www.hqlive.xyz/p/5.html"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="148656">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="148656">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://www.soccershows.pw/events-match-5071258.php"  target="_blank" href="http://www.soccershows.pw/events-match-5071258.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">soccershows  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">EN</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-3">3 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports Premier League</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://www.soccershows.pw/events-match-5071258.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://www.soccershows.pw/events-match-5071258.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="144945">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="144945">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>SO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://wuwza.com/vip1/skysport1de.php"  target="_blank" href="http://wuwza.com/vip1/skysport1de.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">soozyiswoozy  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-SD">SD</span>
                                <span  class="label label-primary language">GER</span>
                                <span title="Bitrate" class="label label-bitrate">800 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKYSPORT 1</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://wuwza.com/vip1/skysport1de.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://wuwza.com/vip1/skysport1de.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149118">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149118">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>PO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://poscitech.com/tottenham-vs-arsenal-2/"  target="_blank" href="https://poscitech.com/tottenham-vs-arsenal-2/">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">poscitechsstream  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name"> Sky Sports Main Event</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://poscitech.com/tottenham-vs-arsenal-2/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://poscitech.com/tottenham-vs-arsenal-2/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="150044">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="150044">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>XA</span>
                        </div>
                    </div>
                    <a class="stream-info" href="https://strmachine.blogspot.com/2020/07/sdf823aldffs.html" target="_blank" href="http://strmachine.blogspot.com/2020/07/sdf823aldffs.html">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">xamegoo  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ARA</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Bein Sports</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a href="https://strmachine.blogspot.com/2020/07/sdf823aldffs.html" target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a href="https://strmachine.blogspot.com/2020/07/sdf823aldffs.html" target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                        </div>
    </div>
</div>
</div>


<div class="row">
<div class="col-lg">
    <!-- Default Card Example -->
    <div class="card mb-4">
        <div class="card-header" style="text-decoration:underline">
            <h2>Acestream</h2>
        </div>
        <div class="card-body" style="background-color: #f7fbe1">
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146338">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="146338">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>HO</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://hockeynews.site/events/2020/th-vs-ars/"  target="_blank" href="http://hockeynews.site/events/2020/th-vs-ars/">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">Hockeynews                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORT MAIN EVENT</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://hockeynews.site/events/2020/th-vs-ars/"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://hockeynews.site/events/2020/th-vs-ars/"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="146040">
                            ▲
                        </div>
                        <div class="votes-count">
                            2
                        </div>
                        <div class="dodownvote" data-stream-id="146040">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>NB</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://nbanownews.com/1-soccer"  target="_blank" href="http://nbanownews.com/1-soccer">
                        <div class="stream-link-info">
                            <span class="username verified-streamer"><span class="first">nbanownews                                             <img class="verified-badge img-fluid" src="https://101placeonline.com/verified-badge.png"
                                             alt=""> <span style="color: #000">verified streamer</span>  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">2000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORT UK COMMENTARY</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://nbanownews.com/1-soccer"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://nbanownews.com/1-soccer"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="147462">
                            ▲
                        </div>
                        <div class="votes-count">
                            3
                        </div>
                        <div class="dodownvote" data-stream-id="147462">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>MA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="http://mazymedias.com/previews/s10/?utm_source=footybite&amp;utm_medium=acestreams&amp;title=Tottenham Hotspur+vs+Arsenal"  target="_blank" href="http://mazymedias.com/previews/s10/?utm_source=footybite&amp;utm_medium=acestreams&amp;title=Tottenham Hotspur+vs+Arsenal">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">MazyStreams  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1200 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">2MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">SKY SPORTS MAIN EVENT HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="http://mazymedias.com/previews/s10/?utm_source=footybite&amp;utm_medium=acestreams&amp;title=Tottenham Hotspur+vs+Arsenal"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="http://mazymedias.com/previews/s10/?utm_source=footybite&amp;utm_medium=acestreams&amp;title=Tottenham Hotspur+vs+Arsenal"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149899">
                            ▲
                        </div>
                        <div class="votes-count">
                            2
                        </div>
                        <div class="dodownvote" data-stream-id="149899">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DU</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="acestream://6f8d5ecd08ce84d662ae714d79f341b448580a12"  target="_blank" href="acestream://6f8d5ecd08ce84d662ae714d79f341b448580a12">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">dubsstreamz  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">4MB</span>                                     <span class="label label-warning tt-0">0 Ads</span>
                                                                    <span class="label label-channel-name">SKY SPORTS 1080p</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="acestream://6f8d5ecd08ce84d662ae714d79f341b448580a12"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="acestream://6f8d5ecd08ce84d662ae714d79f341b448580a12"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149352">
                            ▲
                        </div>
                        <div class="votes-count">
                            1
                        </div>
                        <div class="dodownvote" data-stream-id="149352">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>TS</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://tsportv18.do.am/ace.html"  target="_blank" href="https://tsportv18.do.am/ace.html">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">tsportv  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">ENG</span>
                                <span title="Bitrate" class="label label-bitrate">1500 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">1MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://tsportv18.do.am/ace.html"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://tsportv18.do.am/ace.html"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149937">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149937">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://daddylive.live/channels/ace1.php"  target="_blank" href="https://daddylive.live/channels/ace1.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">daddylive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">EN</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">4MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports Main Event HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://daddylive.live/channels/ace1.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://daddylive.live/channels/ace1.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149944">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149944">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://daddylive.live/channels/ace6.php"  target="_blank" href="https://daddylive.live/channels/ace6.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">daddylive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">EN</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">4MB</span>                                     <span class="label label-warning tt-1">1 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">NBCSN HD</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://daddylive.live/channels/ace6.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://daddylive.live/channels/ace6.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="149960">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="149960">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://daddylive.live/channels/ace9.php"  target="_blank" href="https://daddylive.live/channels/ace9.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">daddylive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">PT</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">4MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sport TV1 Portugal</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://daddylive.live/channels/ace9.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://daddylive.live/channels/ace9.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                                <div class="stream-item">
                    <div class="votes">
                        <div class="doupvote" data-stream-id="150024">
                            ▲
                        </div>
                        <div class="votes-count">
                            0
                        </div>
                        <div class="dodownvote" data-stream-id="150024">
                            ▼
                        </div>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            <span>DA</span>
                        </div>
                    </div>
                    <a class="stream-info"     href="https://daddylive.live/channels/ace18.php"  target="_blank" href="https://daddylive.live/channels/ace18.php">
                        <div class="stream-link-info">
                            <span class="username streamer"><span class="first">daddylive  </span></span>
                        </div>
                            <div class="labels">
                                <span class="label label-danger misr-HD">HD</span>
                                <span  class="label label-primary language">EN</span>
                                <span title="Bitrate" class="label label-bitrate">4000 Kbps</span>                                     <span title="MISR (Minimum Internet Speed Required)" class="label label-misr">4MB</span>                                     <span class="label label-warning tt-2">2 Ads</span>
                                                                        <span title="Mobile Compatible" class="label label-primary label-mobile "><img src="https://101placeonline.com/smartphone-white.png" class="img-fluid mobile" ></span>
                                                                    <span class="label label-channel-name">Sky Sports Premier League</span>

                            </div>
                    </a>



                    <div class="watch-section">
                        <a    href="https://daddylive.live/channels/ace18.php"  target="_blank" class="watch"><img src="https://101placeonline.com/play.png" alt=""></a>
                    </div>
                    <a    href="https://daddylive.live/channels/ace18.php"  target="_blank"><img class="watch-mobile" src="https://101placeonline.com/chevron-right.png" alt=""></a>
                </div>
                        </div>
    </div>
</div>
</div>

`;

export interface WebsiteLinkInformation {
  channelName: string;
  quality: string;
  websiteLink: string;
  language: string;
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

  const titleElements: Cheerio = $(SAMPLE_HTML)
    .find("div.col-lg")
    .first()
    .find("div.stream-item");

  titleElements.each((_, element: CheerioElement) => {
    const channelName: string = $(element)
      .find("span.label-channel-name")
      .first()
      .text()
      .trim();

    const quality: string = $(element)
      .find("span.label-danger")
      .first()
      .text()
      .trim();

    const websiteLink: string | undefined = $(element)
      .find("a.stream-info")
      .first()
      .attr("href");

    const language: string | undefined = $(element)
      .find("span.language")
      .first()
      .text()
      .trim();

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
          language,
        });
      }
    }
  });

  return websiteLinkInformations;
}
