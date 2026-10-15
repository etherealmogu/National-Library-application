using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NationalLibrarySystem.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return RedirectToAction("Index", "Main");
        }

        public ActionResult About()
        {
            return RedirectToAction("AboutPage", "Main");
        }

        public ActionResult Contact()
        {
            return RedirectToAction("ContactPage", "Main");
        }
    }
}