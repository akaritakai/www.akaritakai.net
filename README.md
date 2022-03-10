# www.akaritakai.net
The code that generates https://akaritakai.net/

The project was inspired by [this blog post](https://christine.website/blog/new-language-blog-backend-2022-03-02). The
site's style was inspired by the same site using modified code from
[this repository](https://github.com/Xe/site/tree/e4786467dfc7ec770d4b18e46ee52d2d71f11ba9) under the
[zlib license](https://github.com/Xe/site/blob/e4786467dfc7ec770d4b18e46ee52d2d71f11ba9/LICENSE).

It is built and deployed via GitHub Actions and Terraform by this [CI repo](https://github.com/akaritakai/terraform).
The CI repo also is responsible for monitoring and updating [Webmentions](https://www.w3.org/TR/webmention/) as necessary.