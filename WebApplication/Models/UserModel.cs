using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NationalLibrarySystem.Models
{
    public class UserModel
    {
        public string FName { get; set; }
        public string MName { get; set; }
        public string LName { get; set; }
        public string Position { get; set; }
        public string BookTitle { get; set; }
        public string Author { get; set; }
        public string Status { get; set; } 
    }
}