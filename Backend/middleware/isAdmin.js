const prisma = require('../config/db.js');

const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Check for admin access
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user || user.role !== "Admin") {
            return res.status(403).json({ success: false, message: "Required Permission" });
        }

        next();
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = isAdmin;
