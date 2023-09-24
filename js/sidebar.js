let appSidebar = `

            <div class="sb-overlay"></div>
            <div class="hiiden-sidebar-wrap">
                <!-- sb-widget-wrap-->
                <div class="sb-widget-wrap fl-wrap">
                    <h3>About The Artist</h3>
                    <div class="sb-widget about-widget fl-wrap">
                        <img src="images/about-sb.jpg" alt="">
                        <p>Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum  .</p>
                    </div>
                </div>
                <!-- sb-widget-wrap end-->
                <!-- sb-widget-wrap-->
                <div class="sb-widget-wrap fl-wrap">
                    <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
                    <div class="sb-widget  fl-wrap">
                        <p>Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet,  </p>
                        <div class="subcribe-form fl-wrap">
                            <form id="subscribe">
                                <input class="enteremail" name="email" id="subscribe-email" placeholder="Your Email" spellcheck="false" type="text">
                                <button type="submit" id="subscribe-button" class="subscribe-button">Submit</button>
                                <label for="subscribe-email" class="subscribe-message"></label>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- sb-widget-wrap end--> 
                <!-- sb-widget-wrap-->
                <div class="sb-widget-wrap fl-wrap">
                    <h3>Our Story  video </h3>
                    <div class="sb-widge video-widget   fl-wrap">
                        <img src="images/video-banner.jpg"  class="respimg" alt=""> 
                        <a href="pic.twitter.com/o95T1MBKUq" class="image-popup"><i class="fa fa-play"></i></a>
                    </div>
                </div>
                <!-- sb-widget-wrap end-->       
                <!-- sb-widget-wrap-->
                <div class="sb-widget-wrap fl-wrap">
                    <h3>We're Are Social</h3>
                    <div class="sb-widget    fl-wrap">
                        <div class="sidebar-social fl-wrap">
                            <ul>
                                <li><a href="#" target="_blank"><i class="fa fa-twitter'/X"></i></a></li>
                                <li><a href="#" target="_blank" ><i class="fa fa-instagram"></i></a></li>
                                <li><a href="#" target="_blank" ><i class="fa fa-pinterest"></i></a></li>
                                <li><a href="#" target="_blank" ><i class="fa fa-tumblr"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- sb-widget-wrap end-->           
      
            </div>

`;
document.getElementById("app-sidebar").innerHTML = appSidebar;