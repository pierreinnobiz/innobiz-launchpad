-- Restrict uploads to service role only for videos bucket
CREATE POLICY "Service role can upload videos"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'videos');

-- Restrict updates to service role only
CREATE POLICY "Service role can update videos"
ON storage.objects FOR UPDATE
TO service_role
USING (bucket_id = 'videos');

-- Allow public reads for serving videos
CREATE POLICY "Public can read videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'videos');