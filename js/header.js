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
                <!-- search button-->   
                <div class="show-sibedar vissidebar"></div>
                <!-- search button end --> 
                <!-- sidebar-button --> 
                <div class="sidebar-button-wrap vis-m"></div>
                <!-- sidebar-button end-->                 
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
                                    <li>
                                        <!--third level -->
                                        <a>Single</a>
                                        <ul>
                                            <li><a href="portfolio-single.html">Carousel</a></li>
                                            <li><a href="portfolio-single2.html">Carousel 2</a></li>
                                            <li><a href="portfolio-single3.html">Carousel 3</a></li>
                                            <li><a href="portfolio-single4.html">Slider</a></li>
                                            <li><a href="portfolio-single5.html">Slider 2</a></li>
                                            <li><a href="portfolio-single6.html">Video</a></li>
                                            <li><a href="portfolio-single7.html">Grid</a></li>
                                            <li><a href="portfolio-single8.html">Column Slider</a></li>
                                            <li><a href="portfolio-single9.html">Column Video</a></li>
                                            <li><a href="portfolio-single10.html">Column Grid</a></li>
                                        </ul>
                                        <!--third level end-->
                                    </li>
                                    <li><a href="portfolio2.html">Fullwidth </a></li>
                                    <li><a href="portfolio3.html">Boxed</a></li>
                                    <li><a href="portfolio4.html">List</a></li>
                                    <li><a href="portfolio5.html">Column Grid</a></li>
                                    <li><a href="portfolio6.html">Sibebar Filter </a></li>
                                </ul>
                                <!--second level end-->
                            </li>
                            <li>
                                <a href="resume.html">Resume</a>
                            </li>
                            <li>
                                <a href="https://linktr.ee/grantrobertsart">LinkTree</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <!-- navigation  end -->
            </header>
    </nav>
`;
document.getElementById("app-header").innerHTML = appHeader;