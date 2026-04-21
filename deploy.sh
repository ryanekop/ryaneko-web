#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Ryan Eko Web — Deploy Script (Static Export + Nginx)
# ═══════════════════════════════════════════════════════════════
# Jalankan dari lokal: bash deploy.sh
# ═══════════════════════════════════════════════════════════════

set -euo pipefail

VPS_HOST="root@43.157.213.188"
BRANCH="main"
REMOTE_REPO_DIR="/root/ryaneko-web"
REMOTE_DEPLOY_DIR="/var/www/ryaneko-web/out"
RUN_MODE="${1:-local}"

run_remote_deploy() {
    echo "📁 Repo: ${REMOTE_REPO_DIR}"
    cd "${REMOTE_REPO_DIR}"

    echo "📥 Pulling latest code..."
    git fetch origin "${BRANCH}"
    git checkout "${BRANCH}"
    git pull --ff-only origin "${BRANCH}"

    echo "📦 Installing dependencies..."
    npm ci

    echo "🔨 Building static export..."
    npm run build

    echo "📂 Syncing out/ to nginx web root..."
    mkdir -p "${REMOTE_DEPLOY_DIR}"
    if command -v rsync >/dev/null 2>&1; then
        rsync -av --delete "${REMOTE_REPO_DIR}/out/" "${REMOTE_DEPLOY_DIR}/"
    else
        find "${REMOTE_DEPLOY_DIR}" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
        cp -a "${REMOTE_REPO_DIR}/out/." "${REMOTE_DEPLOY_DIR}/"
    fi

    echo "🧪 Checking deployed routes..."
    ls -la "${REMOTE_DEPLOY_DIR}/after-buy"

    echo "🌐 Reloading nginx..."
    nginx -t
    systemctl reload nginx

    echo ""
    echo "✅ Remote deploy complete!"
    echo "   Commit: $(git rev-parse --short HEAD)"
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
    echo "Ryan Eko Web Deploy (Static Export + Nginx)"
    echo "Usage:"
    echo "  bash deploy.sh"
    echo "  bash deploy.sh --server"
    echo ""
    echo "Local flow:"
    echo "  1. Verifikasi branch main & worktree bersih"
    echo "  2. Push ke GitHub"
    echo "  3. SSH ke VPS"
    echo "  4. git pull + npm ci + npm run build"
    echo "  5. sync out/ ke ${REMOTE_DEPLOY_DIR}"
    echo "  6. test + reload nginx"
    echo ""
    echo "Server flow:"
    echo "  1. git pull + npm ci + npm run build"
    echo "  2. sync out/ ke ${REMOTE_DEPLOY_DIR}"
    echo "  3. test + reload nginx"
    exit 0
fi

if [[ "${RUN_MODE}" == "--server" ]]; then
    echo "═══════════════════════════════════════════"
    echo "🚀 Deploying Ryan Eko Web on server..."
    echo "═══════════════════════════════════════════"
    echo ""
    run_remote_deploy
    echo ""
    echo "✅ Deploy selesai!"
    echo "🌍 Check: https://ryanekoapp.web.id"
    exit 0
fi

if ! command -v ssh >/dev/null 2>&1; then
    echo "❌ ERROR: ssh tidak ditemukan di mesin ini."
    exit 1
fi

if ! command -v git >/dev/null 2>&1; then
    echo "❌ ERROR: git tidak ditemukan di mesin ini."
    exit 1
fi

CURRENT_BRANCH="$(git branch --show-current)"
if [[ "${CURRENT_BRANCH}" != "${BRANCH}" ]]; then
    echo "❌ ERROR: branch aktif saat ini '${CURRENT_BRANCH}', bukan '${BRANCH}'."
    echo "   Pindah ke branch ${BRANCH} dulu sebelum deploy."
    exit 1
fi

if [[ -n "$(git status --short)" ]]; then
    echo "❌ ERROR: masih ada perubahan lokal yang belum di-commit."
    echo "   Commit atau stash dulu sebelum deploy."
    git status --short
    exit 1
fi

echo "═══════════════════════════════════════════"
echo "🚀 Deploying Ryan Eko Web..."
echo "═══════════════════════════════════════════"

echo ""
echo "📤 [1/3] Pushing ${BRANCH} to GitHub..."
git push origin "${BRANCH}"

echo ""
echo "🖥️  [2/3] Building and deploying on VPS..."
ssh "${VPS_HOST}" <<EOF
set -euo pipefail

$(typeset -f run_remote_deploy)
BRANCH="${BRANCH}"
REMOTE_REPO_DIR="${REMOTE_REPO_DIR}"
REMOTE_DEPLOY_DIR="${REMOTE_DEPLOY_DIR}"
run_remote_deploy
EOF

echo ""
echo "✅ [3/3] Deploy selesai!"
echo "🌍 Check: https://ryanekoapp.web.id"
echo "📄 Example pages:"
echo "   https://ryanekoapp.web.id/after-buy/fastpik"
echo "   https://ryanekoapp.web.id/after-buy/client-desk"
echo "   https://ryanekoapp.web.id/after-buy/bundle"
