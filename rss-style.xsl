<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:atom="http://www.w3.org/2005/Atom">
    <xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Ibrahim Alhas - News &amp; Updates</title>
                <style>
                    body { 
                        font-family: 'Georgia', 'Times New Roman', serif;
                        margin: 0;
                        padding: 20px;
                        background-color: #f8f9fa;
                        color: #2c3e50;
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                        background: white;
                        padding: 2rem;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    h1 { 
                        color: #572b2b;
                        border-bottom: 2px solid #e9ecef;
                        padding-bottom: 0.5rem;
                        margin-bottom: 1rem;
                    }
                    .channel-description {
                        color: #6c757d;
                        margin-bottom: 2rem;
                        font-style: italic;
                    }
                    .item { 
                        margin-bottom: 2rem;
                        padding: 1.5rem;
                        border: 1px solid #e9ecef;
                        border-radius: 6px;
                        background: #ffffff;
                    }
                    .item h2 { 
                        color: #572b2b;
                        margin: 0 0 1rem 0;
                        font-size: 1.5rem;
                    }
                    .item p { 
                        margin: 0.5rem 0;
                        line-height: 1.6;
                    }
                    .item a {
                        color: #572b2b;
                        text-decoration: none;
                    }
                    .item a:hover {
                        text-decoration: underline;
                    }
                    .meta {
                        margin-top: 1rem;
                        padding-top: 1rem;
                        border-top: 1px solid #e9ecef;
                        font-size: 0.9rem;
                        color: #6c757d;
                    }
                    .categories {
                        margin-top: 0.5rem;
                    }
                    .category {
                        display: inline-block;
                        background: #f8f9fa;
                        padding: 0.2rem 0.6rem;
                        border-radius: 4px;
                        margin-right: 0.5rem;
                        margin-bottom: 0.5rem;
                        font-size: 0.8rem;
                        color: #495057;
                    }
                    .copyright {
                        text-align: center;
                        margin-top: 2rem;
                        padding-top: 1rem;
                        border-top: 1px solid #e9ecef;
                        color: #6c757d;
                        font-size: 0.9rem;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>
                        <xsl:value-of select="rss/channel/title"/>
                    </h1>
                    <p class="channel-description">
                        <xsl:value-of select="rss/channel/description"/>
                    </p>
                    <xsl:for-each select="rss/channel/item">
                        <div class="item">
                            <h2>
                                <a href="{link}">
                                    <xsl:value-of select="title"/>
                                </a>
                            </h2>
                            <p>
                                <xsl:value-of select="description"/>
                            </p>
                            <div class="meta">
                                <p>
                                    <strong>Date:</strong>
                                    <xsl:value-of select="pubDate"/>
                                </p>
                                <p>
                                    <strong>Author:</strong>
                                    <xsl:value-of select="author"/>
                                </p>
                                <div class="categories">
                                    <xsl:for-each select="category">
                                        <span class="category">
                                            <xsl:value-of select="."/>
                                        </span>
                                    </xsl:for-each>
                                </div>
                            </div>
                        </div>
                    </xsl:for-each>
                    <div class="copyright">
                        <xsl:value-of select="rss/channel/copyright"/>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>