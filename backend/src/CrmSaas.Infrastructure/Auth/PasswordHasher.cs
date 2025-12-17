using System.Security.Cryptography;
using System.Text;

namespace CrmSaas.Infrastructure.Auth;

public static class PasswordHasher
{
    public static string Hash(string password)
    {
        // simple PBKDF2 hash
        using var deriveBytes = new Rfc2898DeriveBytes(password, 16, 100_000, HashAlgorithmName.SHA256);
        var salt = deriveBytes.Salt;
        var key = deriveBytes.GetBytes(32);

        var result = new byte[1 + salt.Length + key.Length];
        result[0] = 0x01; // version
        Buffer.BlockCopy(salt, 0, result, 1, salt.Length);
        Buffer.BlockCopy(key, 0, result, 1 + salt.Length, key.Length);
        return Convert.ToBase64String(result);
    }

    public static bool Verify(string password, string hash)
    {
        var bytes = Convert.FromBase64String(hash);
        if (bytes[0] != 0x01) return false;

        var salt = new byte[16];
        Buffer.BlockCopy(bytes, 1, salt, 0, salt.Length);
        var storedKey = new byte[32];
        Buffer.BlockCopy(bytes, 1 + salt.Length, storedKey, 0, storedKey.Length);

        using var deriveBytes = new Rfc2898DeriveBytes(password, salt, 100_000, HashAlgorithmName.SHA256);
        var computedKey = deriveBytes.GetBytes(32);

        return CryptographicOperations.FixedTimeEquals(storedKey, computedKey);
    }
}
