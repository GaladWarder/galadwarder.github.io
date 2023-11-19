let appHeader = `
    <nav>
       <header class="main-header">
                <div class="header-contacts">
                    <ul>
                        <li><span>Discord :</span> galadwarder</li>
                        <li><span>Email Me :</span> 
                            <button title="Click to Copy" type="submit" value="copy" id="copyButton" class=copybutton>galaddota@yahoo.com</button>  
                        </li>
                    </ul>
                </div>
                <span id="custom-tooltip">copied!</span>
                <textarea class=visuallyhidden id="box">galaddota@yahoo.com</textarea>
                </div>

                <a class="logo-holder" href="index.html"><img src="images/logo.png" alt=""></a>

                <!--   
                <div class="show-sibedar vissidebar"></div>
                --> 

                <!-- sidebar-button  
                <div class="sidebar-button-wrap vis-m"></div>
                --->           

                <!-- mobile nav --> 
                <div class="nav-button-wrap">
                    <div class="nav-button vis-main-menu"><span></span><span></span><span></span></div>
                </div>
                <!-- mobile nav end--> 
                
                <!--  navigation --> 
                <div class="nav-holder">
                    <nav>
                        <ul>
                            <li>
                                <a href="index.html" class="act-link">Home </a>
                            </li>
                            <li>
                                <a href="portfolio.html">Portfolio</a>
                                <!--second level -->
                                <ul>
                                    <li><a href="portfolio.html">All</a></li>
                                    <li><a href="portfolio-battleplan.html">BattlePlan!</a></li>
                                    <li><a href="portfolio-triumph.html">Triumph</a></li>
                                    <li><a href="portfolio-packageblue.html">Package Blue</a></li>
                                    <li><a href="portfolio-projectdot.html">Project DOT</a></li>
                                    <li><a href="portfolio-inhabitants-posters.html">Inhabitants Posters</a></li>
                                </ul>
                                <!--second level end-->
                            </li>
                            <li>
                                <a href="resume.html">Resume</a>
                            </li>
                            <li>
                                <a href="#">Links</a>
                                <!--second level -->
                                <ul>
                                    <li><a target="_blank" href="https://www.linkedin.com/in/grantrobertsart/">LinkedIn</a></li>
                                    <li><a target="_blank" href="https://www.artstation.com/grantroberts">Artstation</a></li>
                                    <li><a target="_blank" href="https://twitter.com/GaladWarder">Twitter / X</a></li>
                                    <li><a target="_blank" href="https://discord.gg/artworkhouse"> Join the Art Work House Server</a></li>
                                    <li><a target="_blank" href="https://open.spotify.com/show/4aHgc3ZoG6SfW8I69XuUlN">Sessions at the Art Work House on Spotify</a></li>
                                </ul>
                                <!--second level end-->
                            </li>
                        </ul>
                    </nav>
                </div>
                <!-- navigation  end -->
            </header>
    </nav>
`;
document.getElementById("app-header").innerHTML = appHeader;