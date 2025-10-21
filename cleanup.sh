#!/bin/bash

echo "=== COMPLETE CLEANUP: Removing ALL old files ==="

# Delete entire lib directory
echo "Deleting lib/ directory..."
rm -rf lib/

# Delete entire hooks directory
echo "Deleting hooks/ directory..."
rm -rf hooks/

# Delete entire scenes directory
echo "Deleting scenes/ directory..."
rm -rf scenes/

# Delete unused component directories
echo "Deleting components/ui/..."
rm -rf components/ui/

echo "Deleting components/brand/..."
rm -rf components/brand/

echo "Deleting components/sections/..."
rm -rf components/sections/

echo "Deleting components/ux/..."
rm -rf components/ux/

echo "Deleting components/command/..."
rm -rf components/command/

echo "Deleting components/scroll/..."
rm -rf components/scroll/

echo "Deleting components/toast/..."
rm -rf components/toast/

# Delete unused individual component files
echo "Deleting HubSpot components..."
rm -f components/HubSpotEmbed.tsx
rm -f components/HubSpotForm.tsx
rm -f components/SmoothScrollProvider.tsx

# Delete styles directory (using brand-specific CSS)
echo "Deleting styles/ directory..."
rm -rf styles/

# Delete utils directory
echo "Deleting utils/ directory..."
rm -rf utils/

# Delete types directory (tinykeys)
echo "Deleting types/ directory..."
rm -rf types/

echo "=== CLEANUP COMPLETE ==="
echo "Remaining component structure:"
ls -la components/
