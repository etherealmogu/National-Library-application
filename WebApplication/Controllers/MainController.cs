using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NationalLibrarySystem.Models;

namespace NationalLibrarySystem.Controllers
{
    public class MainController : Controller
    {
        public ActionResult LoginPage()
        {
            return View();
        }

        public ActionResult Index()
        {
            ViewBag.WelcomeMessage = "Welcome to the National Library & Employee Management System!";
            ViewBag.Subtitle = "Your centralized portal for personnel management, catalog circulation, and book tracking.";
            return View();
        }

        public ActionResult RegistrationPage()
        {
            return View();
        }

        public ActionResult AboutPage()
        {
            ViewBag.Title = "About - National Library & Employee Management System";
            return View();
        }

        public ActionResult ContactPage()
        {
            ViewBag.Title = "Contact Us - National Library System";
            return View();
        }

        public string GetUsernameFunc()
        {
            return "Yiran Zhou";
        }

        public string UpdateUsernameFunc(string username)
        {
            var updatedname = $"{username} - updated";
            return updatedname;
        }

        public JsonResult CollectiveUpdateFunc(UserModel umodel)
        {
            if (umodel == null)
            {
                umodel = new UserModel();
            }
            umodel.FName = $"{umodel.FName} - updated";
            umodel.MName = $"{umodel.MName} - updated";
            umodel.LName = $"{umodel.LName} - updated";
            umodel.Position = $"{umodel.Position} - updated";
            umodel.BookTitle = string.IsNullOrEmpty(umodel.BookTitle) ? "General Library Book - updated" : $"{umodel.BookTitle} - updated";
            umodel.Author = string.IsNullOrEmpty(umodel.Author) ? "Unknown Author - updated" : $"{umodel.Author} - updated";
            umodel.Status = string.IsNullOrEmpty(umodel.Status) ? "Borrowed" : umodel.Status;
            return Json(umodel, JsonRequestBehavior.AllowGet);
        }


    }
}