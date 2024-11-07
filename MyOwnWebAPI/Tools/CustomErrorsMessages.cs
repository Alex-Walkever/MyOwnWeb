using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MyOwnWeb.Tools
{
    public static class CustomErrorsMessages
    {
        private static List<IdentityError> BuildError(IdentityError identityError)
        {
            var errores = new List<IdentityError>();
            errores.Add(identityError);

            return errores;
        }

        public static IEnumerable<IdentityError> FailToLogin()
        {
            return BuildError(new IdentityError() { Description = "falseLogin" });
        }
        public static IEnumerable<IdentityError> ThisUserAlreadyClaim()
        {
            return BuildError(new IdentityError() { Description = "claimAlready" });
        }
    }
}
